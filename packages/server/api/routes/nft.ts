import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export default new Hono().get(
  "/img",
  zValidator(
    "query",
    z.object({
      name: z.string(),
      image: z.string(),
    })
  ),
  async (ctx) => {
    const { name, image } = ctx.req.valid("query");

    ctx.header("Content-Type", "image/svg+xml");

    return ctx.body(nftSvg(name, image), 200);
  }
);

const nftSvg = (name: string, image: string) => `
<svg width="640" height="640" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root {
      --back: #030f1c;
      --front: #7cbaff;
    }
  </style>
  <defs>
    <clipPath id="clip-pfp">
      <circle cx="325" cy="230" r="155" />
    </clipPath>
    <linearGradient id="text-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="40%" stop-color="var(--front)" />
      <stop offset="100%" stop-color="#fff" />
    </linearGradient>
    <linearGradient id="border-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e90ff" />
      <stop offset="40%" stop-color="#f5f" />
      <stop offset="100%" stop-color="#5ff" />
    </linearGradient>
  </defs>

  <rect width="640" height="640" rx="42" fill="url(#border-gradient)" />
  <rect x="5" y="5" width="630" height="630" rx="38" fill="var(--back)" />

  <image
    href="${image}"
    x="160" y="72" width="320" height="320" clip-path="url(#clip-pfp)" preserveAspectRatio="xMidYMid slice" />

  <text x="320" text-anchor="middle" dominant-baseline="middle" y="500" font-family="Calibri, sans-serif" font-size="64"
    font-weight="700" fill="url(#text-gradient)">
    ${name}
  </text>
</svg>
`;
