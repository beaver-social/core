FROM oven/bun:latest AS base
WORKDIR /packages/server

COPY package.json bun.lock ./
RUN bun i --frozen-lockfile

COPY . .

CMD ["bun", "dev"]