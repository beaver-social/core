FROM oven/bun:latest AS base
WORKDIR /packages/server

COPY package.json bun.lock ./
RUN bun i

COPY . .

CMD ["bun", "dev"]