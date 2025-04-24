import { bcs } from "@mysten/sui/bcs";
import { Transaction } from "@mysten/sui/transactions";
import { formatAddress } from "@mysten/sui/utils";

type MoveKey = {
  id: string;
};

type Objects = {
  clock: MoveKey;
  registry: MoveKey;
  adminsRecord: MoveKey;
};

class Contracts {
  config: {
    packageId: string;
    objects: Objects;
  };

  constructor(config: { packageId: string; objects: Objects }) {
    this.config = config;
  }

  get registry() {
    return {
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
    };
  }

  get identityRegistration() {
    return {
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
    };
  }

  get admin() {
    return {
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
            tx.pure(bcs.Address.serialize(formatAddress(args.receiver))),
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
            tx.pure(bcs.String.serialize(args.username)),
            tx.pure(bcs.String.serialize(args.about)),
            registry,
            tx.pure(bcs.Address.serialize(formatAddress(args.receiver))),
            clock,
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
            tx.pure(
              bcs.Address.serialize(formatAddress(args.adminCapIdToRevoke))
            ),
          ],
        });
      },
    };
  }

  get post() {
    return {
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
          postsRegistry: MoveKey;
          identityRegistration: MoveKey;
          username: string;
          postId: number;
          content: string;
          attested: Uint8Array;
          collection: MoveKey;
        }
      ) => {
        const postsRegistry = tx.object(args.postsRegistry.id);
        const identity = tx.object(args.identityRegistration.id);
        const collection = tx.object(args.collection.id);
        const clock = tx.object(this.config.objects.clock.id);

        tx.moveCall({
          target: `${this.config.packageId}::posts::push`,
          arguments: [
            postsRegistry,
            identity,
            tx.pure(bcs.String.serialize(args.username)),
            tx.pure.u64(args.postId),
            tx.pure(bcs.String.serialize(args.content)),
            tx.pure(args.attested),
            collection,
            clock,
          ],
        });
      },
    };
  }

  get awards() {
    return {
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
            tx.pure(bcs.Address.serialize(formatAddress(args.recipient))),
            tx.pure.u64(args.awardType),
            payment,
            tx.pure.u64(args.postId),
            clock,
          ],
        });
      },
    };
  }
}

export default Contracts;
