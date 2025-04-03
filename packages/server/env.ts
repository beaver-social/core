const envKeys = [
  "SERVER_PRIVATE_KEY",
  // DB
  "DB_FILE_NAME",
  // R2
  "R2_ACCESS_KEY_ID",
  "R2_SECRET_ACCESS_KEY",
  "R2_BUCKET_NAME",
  "R2_ENDPOINT",
  "GOOGLE_CLIENT_SECRET",
  "OAUTH_SALT_MASTER_SEED",

  // "localnet", "devnet", "testnet", "mainnet"
  "VITE_SUI_NETWORK",
  // Replace this with beaver's official google client id from google cloud console
  "VITE_GOOGLE_CLIENT_ID",
  // google's callback redirect url. should be the same as the one in the google cloud console
  "VITE_GOOGLE_REDIRECT_URL",
  // Replace this with beaver's official salt service url
  "VITE_SALT_SERVICE_URL",
  // get this from enoki dashboard for beaver's account
  "VITE_ENOKI_API_KEY",
  // only works for devnet. replace this with enoki api key for mainnet
  "VITE_ZK_PROVING_SERVICE_URL",
  // idk wtf are these for
  "VITE_OPENID_PROVIDER_URL",
  "VITE_PACKAGE_ID",
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
ensureEnv();

export default env;
