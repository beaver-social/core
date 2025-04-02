FROM oven/bun:1-alpine AS base

WORKDIR /app

COPY package.json ./
COPY packages/server/package.json ./packages/server/
COPY packages/lib/beaver-client/package.json ./packages/lib/beaver-client/
# COPY packages/lib/beaver-core/package.json ./packages/lib/beaver-core/

# 4. Install ALL Dependencies
# Installs both production and development dependencies needed for the build
# --frozen-lockfile ensures we use the exact versions from the lockfile
RUN bun install --frozen-lockfile

# 5. Copy ALL Source Code
# Copies your entire monorepo (respecting .dockerignore) into /app
COPY . .

# 6. Build the Server Package
# Change directory into the server package and run its build script
# Assumes 'build' script exists in packages/server/package.json (e.g., "vite build")
RUN cd packages/server && bun run build

# 7. Set Environment & Expose Port
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
# You can change the port later when running the container (e.g., docker run -p 8080:3000 ...)

# 8. Define Run Command
# Tell Docker how to start the server using Bun
# Assumes your entrypoint is packages/server/src/index.ts
# Adjust this path if your server entrypoint is different
CMD ["bun", "run", "packages/server/src/index.ts"]

# --- End of Dockerfile ---