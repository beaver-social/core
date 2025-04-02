FROM oven/bun:1.2.8-alpine AS base

WORKDIR /app

COPY package.json ./
COPY packages/server/package.json ./packages/server/
COPY packages/lib/beaver-client/package.json ./packagesp/lib/beaver-client/
# COPY packages/lib/beaver-react/package.json ./packages/lib/beaver-react/

RUN bun i

COPY . .

WORKDIR /app/packages/server

ENV DB_FILE_NAME=primary.db
RUN bun run build

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

ENTRYPOINT ["bun", "run", "app/packages/server/server.ts"]
