FROM oven/bun:1-alpine AS base

WORKDIR /app

COPY package.json ./
COPY packages/server/package.json ./packages/server/
COPY packages/lib/beaver-client/package.json ./packages/lib/beaver-client/
# COPY packages/lib/beaver-core/package.json ./packages/lib/beaver-core/

RUN bun install

COPY . .

RUN cd packages/server && bun run build

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["bun", "run", "packages/server/src/server"]
