import { bcs } from "@mysten/sui/bcs";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { z } from "zod";
import { zNumberString, zSuiRPCObjectResult } from "./utils";

type MoveKey = {
  id: string;
};

type Objects = {
  clock: MoveKey;
  adminsRecord: MoveKey;
  awardsData: MoveKey;
  postsRegistry: MoveKey;
  registry: MoveKey;
};

type ContractsConfig = {
  packageId: string;
  objects: Objects;
  network: Parameters<typeof getFullnodeUrl>[0];
};

export type ContractName =
  | "registry"
  | "identityRegistration"
  | "admin"
  | "posts"
  | "awards";

class Contracts {
  private config: ContractsConfig;
  client: SuiClient;

  constructor(config: ContractsConfig) {
    this.config = config;
    this.client = new SuiClient({
      url: getFullnodeUrl("testnet"),
    });
  }

  private async readMoveTable(args: {
    object: MoveKey;
    table: string;
    key: { type: string; value: string };
  }) {
    const client = this.client;

    const object = await client.getObject({
      id: args.object.id,
      options: { showContent: true },
    });

    const parsedObject = zSuiRPCObjectResult({
      [args.table]: z.object({
        fields: z.object({
          id: z.object({
            id: z.string(),
          }),
        }),
      }),
    }).parse(object);

    const dynamicFieldObject = await client.getDynamicFieldObject({
      parentId: parsedObject[args.table].fields.id.id,
      name: args.key,
    });

    const result = zSuiRPCObjectResult({
      value: z.unknown().optional(),
    }).parse(dynamicFieldObject);

    return result.value;
  }

  get registry() {
    return {
      write: {
        /**
         * Mints a new IdentityRegistration NFT for the transaction sender.
         * @param tx - The Transaction object to add the move call to.
         * @param args - The arguments for minting.
         * @param args.username - The desired username for the identity.
         * @param args.about - A short description or bio for the identity.
         */
        mint: (tx: Transaction, args: { username: string; about: string }) => {
          const registry = tx.object(this.config.objects.registry.id);
          const clock = tx.object(this.config.objects.clock.id);

          tx.moveCall({
            target: `${this.config.packageId}::registry::mint`,
            arguments: [
              tx.pure(bcs.String.serialize(args.username)),
              tx.pure(bcs.String.serialize(args.about)),
              registry,
              clock,
            ],
          });
        },

        /**
         * Switches the owner of an IdentityRegistration to match the owner of a SuinsRegistration.
         * This effectively links the identity to the Suins name.
         * @param tx - The Transaction object to add the move call to.
         * @param args - The arguments for switching the owner.
         * @param args.identityRegistration - The IdentityRegistration object whose owner needs to be switched.
         * @param args.suinsRegistration - The SuinsRegistration object whose owner will become the new owner of the identity.
         */
        switchOwner: (
          tx: Transaction,
          args: { identityRegistration: MoveKey; suinsRegistration: MoveKey }
        ) => {
          const registry = tx.object(this.config.objects.registry.id);
          const identity = tx.object(args.identityRegistration.id);
          const clock = tx.object(this.config.objects.clock.id);
          const suinsRegistration = tx.object(args.suinsRegistration.id);

          tx.moveCall({
            target: `${this.config.packageId}::registry::switch_owner`,
            arguments: [registry, identity, suinsRegistration, clock],
          });
        },
      },

      read: {
        resolveAddress: async (args: { username: string }) => {
          const owner = await this.readMoveTable({
            object: this.config.objects.registry,
            table: "owners",
            key: { type: "0x1::string::String", value: args.username },
          });

          return owner;
        },

        resolveUsername: async (args: { address: string }) => {
          const username = await this.readMoveTable({
            object: this.config.objects.registry,
            table: "usernames",
            key: {
              type: "address",
              value: args.address,
            },
          });

          return username;
        },
      },
    };
  }

  get identityRegistration() {
    return {
      write: {
        /**
         * Attaches a SuinsRegistration NFT to an IdentityRegistration NFT.
         * This typically follows a `switchOwner` call to formally link the two NFTs within the identity object.
         * @param tx - The Transaction object to add the move call to.
         * @param args - The arguments for attaching the Suins NFT.
         * @param args.identityRegistration - The IdentityRegistration object to attach to.
         * @param args.suinsRegistration - The SuinsRegistration object to attach.
         */
        attachSuins: (
          tx: Transaction,
          args: {
            identityRegistration: MoveKey;
            suinsRegistration: MoveKey;
          }
        ) => {
          const identity = tx.object(args.identityRegistration.id);
          const suins = tx.object(args.suinsRegistration.id);

          tx.moveCall({
            target: `${this.config.packageId}::identity_registration::attach_suins`,
            arguments: [identity, suins],
          });
        },

        /**
         * Updates the 'about' field of an IdentityRegistration NFT.
         * @param tx - The Transaction object to add the move call to.
         * @param args - The arguments for setting the about text.
         * @param args.identityRegistration - The IdentityRegistration object to modify.
         * @param args.about - The new about text.
         */
        setAbout: (
          tx: Transaction,
          args: { identityRegistration: MoveKey; about: string }
        ) => {
          const identity = tx.object(args.identityRegistration.id);

          tx.moveCall({
            target: `${this.config.packageId}::identity_registration::set_about`,
            arguments: [identity, tx.pure(bcs.String.serialize(args.about))],
          });
        },
      },

      read: {
        data: async (args: { registration: MoveKey }) => {
          const registration = await this.client.getObject({
            id: args.registration.id,
            options: { showContent: true },
          });

          const parsedObject = zSuiRPCObjectResult({
            username: z.string(),
            identity_data: z.object({
              fields: z.object({
                about: z.string(),
                owner: z.string(),
                suins_domain_name: z.string().nullable(),
              }),
            }),
          }).parse(registration);

          const username = parsedObject.username;
          const identity = parsedObject.identity_data.fields;

          const data = {
            username: username,
            about: identity.about,
            owner: identity.owner,
            suins_domain_name: identity.suins_domain_name,
          };

          return data;
        },
      },
    };
  }

  get admin() {
    return {
      write: {
        /**
         * Grants an AdminCap to a specified receiver address, giving them admin privileges.
         * Requires the caller to possess an AdminCap.
         * @param tx - The Transaction object to add the move call to.
         * @param args - The arguments for elevating an address to admin.
         * @param args.adminCap - The AdminCap object of the caller.
         * @param args.receiver - The address to grant admin privileges to.
         */
        elevate: (
          tx: Transaction,
          args: { adminCap: MoveKey; receiver: string }
        ) => {
          const adminsRecord = tx.object(this.config.objects.adminsRecord.id);
          const adminCap = tx.object(args.adminCap.id);

          tx.moveCall({
            target: `${this.config.packageId}::admin::elevate`,
            arguments: [
              adminCap,
              adminsRecord,
              tx.pure(bcs.Address.serialize(args.receiver)),
            ],
          });
        },

        /**
         * Allows an admin to mint an IdentityRegistration NFT for a specified receiver address.
         * Requires the caller to possess an AdminCap.
         * @param tx - The Transaction object to add the move call to.
         * @param args - The arguments for minting on behalf of a user.
         * @param args.adminCap - The AdminCap object of the caller.
         * @param args.username - The username for the new identity.
         * @param args.about - The about text for the new identity.
         * @param args.receiver - The address that will receive the minted IdentityRegistration NFT.
         */
        mint_for: (
          tx: Transaction,
          args: {
            adminCap: MoveKey;
            username: string;
            about: string;
            receiver: string;
          }
        ) => {
          const adminCap = tx.object(args.adminCap.id);
          const adminsRecord = tx.object(this.config.objects.adminsRecord.id);
          const registry = tx.object(this.config.objects.registry.id);
          const clock = tx.object(this.config.objects.clock.id);

          tx.moveCall({
            target: `${this.config.packageId}::admin::mint_for`,
            arguments: [
              adminCap,
              adminsRecord,
              registry,
              clock,
              bcs.String.serialize(args.username),
              bcs.String.serialize(args.about),
              bcs.Address.serialize(args.receiver),
            ],
          });
        },

        /**
         * Revokes the admin privileges (AdminCap) of a specified address.
         * Requires the caller to possess an AdminCap.
         * @param tx - The Transaction object to add the move call to.
         * @param args - The arguments for revoking admin privileges.
         * @param args.adminCap - The AdminCap object of the caller.
         * @param args.adminCapIdToRevoke - The address whose AdminCap should be revoked. Note: This refers to the *address* of the admin, not the object ID of their AdminCap.
         */
        revoke: (
          tx: Transaction,
          args: { adminCap: MoveKey; adminCapIdToRevoke: string }
        ) => {
          const adminCap = tx.object(args.adminCap.id);
          const adminsRecord = tx.object(this.config.objects.adminsRecord.id);

          tx.moveCall({
            target: `${this.config.packageId}::admin::revoke`,
            arguments: [
              adminCap,
              adminsRecord,
              tx.pure(bcs.Address.serialize(args.adminCapIdToRevoke)),
            ],
          });
        },
      },

      read: {},
    };
  }

  get posts() {
    return {
      write: {
        /**
         * Creates a new post in the posts registry.
         * @param tx - The Transaction object to add the move call to.
         * @param args - The arguments for creating a post.
         * @param args.postsRegistry - The PostsRegistry object.
         * @param args.identityRegistration - The IdentityRegistration object of the author.
         * @param args.username - The username of the author.
         * @param args.postId - The unique ID for the post.
         * @param args.content - The content of the post.
         * @param args.attested - The attestation vector (typically a signature).
         * @param args.beaverPosts - The MY_BEAVER_POSTS collection for the user.
         */
        push: (
          tx: Transaction,
          args: {
            identityRegistration: MoveKey;
            postId: number;
            content: string;
            attested: Uint8Array;
            collection: MoveKey;
          }
        ) => {
          const postsRegistry = tx.object(this.config.objects.postsRegistry.id);
          const identity = tx.object(args.identityRegistration.id);
          const collection = tx.object(args.collection.id);
          const clock = tx.object(this.config.objects.clock.id);

          tx.moveCall({
            target: `${this.config.packageId}::posts::push`,
            arguments: [
              postsRegistry,
              identity,
              tx.pure.u64(args.postId),
              tx.pure(bcs.String.serialize(args.content)),
              tx.pure(args.attested),
              collection,
              clock,
            ],
          });
        },
      },

      read: {
        getByPostId: async (args: { postId: number }) => {
          const postResponse = await this.readMoveTable({
            object: this.config.objects.postsRegistry,
            table: "postid_post",
            key: { type: "u64", value: args.postId.toString() },
          });

          const post = z
            .object({
              fields: z.object({
                post_id: zNumberString(),
                author: z.string(),
                content: z.string(),
                upgraded_at: zNumberString(),
              }),
            })
            .parse(postResponse);

          return post.fields;
        },
      },
    };
  }

  get awards() {
    return {
      write: {
        /**
         * Gifts an award to a recipient for a specific post.
         * @param tx - The Transaction object to add the move call to.
         * @param args - The arguments for gifting an award.
         * @param args.awardsData - The AwardsData shared object.
         * @param args.recipient - The address of the recipient.
         * @param args.awardType - The type of award (0=Gold, 1=Silver, 2=Bronze).
         * @param args.payment - The SUI coin object for payment.
         * @param args.postId - The ID of the post being awarded.
         */
        gift: (
          tx: Transaction,
          args: {
            awardsData: MoveKey;
            recipient: string;
            awardType: number;
            payment: MoveKey;
            postId: number;
          }
        ) => {
          const awardsData = tx.object(args.awardsData.id);
          const registry = tx.object(this.config.objects.registry.id);
          const payment = tx.object(args.payment.id);
          const clock = tx.object(this.config.objects.clock.id);

          tx.moveCall({
            target: `${this.config.packageId}::awards::gift`,
            arguments: [
              awardsData,
              registry,
              tx.pure(bcs.Address.serialize(args.recipient)),
              tx.pure.u64(args.awardType),
              payment,
              tx.pure.u64(args.postId),
              clock,
            ],
          });
        },
      },

      read: {
        getAwardsData: async () => {
          const awardsDataResponse = await this.client.getObject({
            id: this.config.objects.awardsData.id,
            options: { showContent: true },
          });

          const parsedObject = zSuiRPCObjectResult({
            award_names: z.array(z.string()),
            award_costs: z.array(zNumberString()),
          }).parse(awardsDataResponse);

          return {
            awardNames: parsedObject.award_names,
            awardCosts: parsedObject.award_costs,
          };
        },

        getAwardDetails: async (args: { awardId: string }) => {
          const awardResponse = await this.client.getObject({
            id: args.awardId,
            options: { showContent: true },
          });

          const award = zSuiRPCObjectResult({
            username: z.string(),
            name: z.string(),
            created_at: zNumberString(),
            recipient: z.string(),
            sender: z.string(),
            post_id: zNumberString(),
          }).parse(awardResponse);

          return {
            username: award.username,
            name: award.name,
            createdAt: award.created_at,
            recipient: award.recipient,
            sender: award.sender,
            postId: award.post_id,
          };
        },

        getAwardsByRecipient: async (args: { address: string }) => {
          const response = await this.client.getOwnedObjects({
            owner: args.address,
            filter: {
              StructType: `${this.config.packageId}::awards::Award`,
            },
            options: { showContent: true },
          });

          const awards = response.data.map((item) => {
            if (!item.data) return;

            const data = zSuiRPCObjectResult({
              username: z.string(),
              name: z.string(),
              created_at: zNumberString(),
              recipient: z.string(),
              sender: z.string(),
              post_id: zNumberString(),
            }).parse(item.data);

            return {
              id: item.data.objectId,
              username: data.username,
              name: data.name,
              createdAt: data.created_at,
              recipient: data.recipient,
              sender: data.sender,
              postId: data.post_id,
            };
          });

          return awards.filter((i) => i !== undefined);
        },
      },
    };
  }
}

// const g = new Contracts({} as any);
// g.write.awards().;

export default Contracts;
