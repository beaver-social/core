const envKeys = [
  "SERVER_PASSPHRASE",

  "DB_FILE_NAME",

  "R2_ACCESS_KEY_ID",
  "R2_SECRET_ACCESS_KEY",
  "R2_BUCKET_NAME",
  "R2_ENDPOINT",

  "SUI_NETWORK",
  "JWT_SECRET",
  "GEMINI_API_KEY",
] as const;

type ENV = Record<(typeof envKeys)[number], string>;

let env: ENV = {} as any;

export function ensureEnv() {
  for (const key of envKeys) {
    if (!Bun.env[key]) {
      throw new Error(`Environment variable ${key} is not set`);
    }
  }

  env = Object.fromEntries(envKeys.map((key) => [key, Bun.env[key]])) as ENV;
}
const isProd =
  process.env["NODE_ENV"] === "production" ||
  process.env["NODE_ENV"] === "prod";
if (!isProd) ensureEnv();

export default env;
