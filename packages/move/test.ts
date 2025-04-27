import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { z } from "zod";
import { zNumberString, zSuiRPCObjectResult } from "./services/utils";

const objectId =
  "0x8307457995996a3d3ff1796d94302734ad3794016eb1f428fa0c9e4e147ab774";
const table = "postid_post";
const key =
  "0x2f0e29b511b7cce13849d2d48414af95d10487d9e9fbb7548eb7dfbf12aaabef";

// async function readMoveTable() {}
const client = new SuiClient({
  url: getFullnodeUrl("testnet"),
});

const object = await client.getObject({
  id: "0x9c195aba1a392c4a6d234f09097b2e4c1cb45f04ede8973f153575147c0d1efa",
  options: { showContent: true },
});

async function readMoveTable(args: {
  object: { id: string };
  table: string;
  key: { type: string; value: string };
}) {
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

// const f = await readMoveTable({
//   table: "owners",
//   object: { id: objectId },
//   key: {
//     type: "0x1::string::String",
//     value: "random",
//   },
// });

// const f = await client.getObject({
//   id: "0x00380af42cb9448362ea94975e9556b15dbb9b5420efa79fc97aef3223f26f26",
//   options: { showContent: true },
// });

// const d = zSuiRPCObjectResult({
//   username: z.string(),
//   identity_data: z.object({
//     fields: z.object({
//       about: z.string(),
//       owner: z.string(),
//       suins_domain_name: z.string().nullable(),
//     }),
//   }),
// }).parse(f);

// const f = await readMoveTable({
//   object: { id: objectId },
//   table: "postid_post",
//   key: {
//     type: "u64",
//     value: "1",
//   },
// });

// const d = z
//   .object({
//     fields: z.object({
//       post_id: zNumberString(),
//       author: z.string(),
//       content: z.string(),
//       upgraded_at: zNumberString(),
//     }),
//   })
//   .parse(f);

const f = await client.getObject({
  id: "0x8a25c63a9ae03584fe104baf7a72edb41cab5f61a1ccae1eac37b29ecf79f4a3",
  options: { showContent: true },
});

const d = zSuiRPCObjectResult({
  posts: z.array(zNumberString()),
}).parse(f);

console.log(d);
