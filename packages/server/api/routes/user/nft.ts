import { Hono } from "hono";

/**
 * User NFT Routes
 * Base path: /user/nft
 */
export default new Hono()
  .get("/gallery", (ctx) => {
    return ctx.json({
      nfts: [],
      pagination: { page: 1, limit: 20, total: 0 },
      message: "Get user's NFT gallery",
    });
  })
  .get("/gallery/settings", (ctx) => {
    return ctx.json({
      settings: {},
      message: "Get NFT gallery settings",
    });
  })
  .patch("/gallery/settings", (ctx) => {
    return ctx.json({
      settings: {},
      message: "Update NFT gallery settings",
    });
  })
  .get("/details/:tokenId", (ctx) => {
    const tokenId = ctx.req.param("tokenId");
    return ctx.json({
      nft: { tokenId },
      metadata: {},
      history: [],
      message: "Get NFT details",
    });
  })
  .get("/collections", (ctx) => {
    return ctx.json({
      collections: [],
      message: "Get user's NFT collections",
    });
  })
  .get("/featured", (ctx) => {
    return ctx.json({
      nfts: [],
      message: "Get user's featured NFTs",
    });
  })
  .post("/verify-ownership", (ctx) => {
    return ctx.json({
      verified: true,
      ownershipProof: "proof-123",
      message: "Verify NFT ownership",
    });
  });
