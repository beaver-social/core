export function camelToDotCase(str: string | null | undefined): string {
  if (!str) {
    return "";
  }

  const dotSeparated = str
    .replace(/([A-Z])([A-Z][a-z])/g, "$1.$2")
    .replace(/([a-z\d])([A-Z])/g, "$1.$2");

  return "v1." + dotSeparated.toLowerCase();
}

export function generateHash(data: string): string {
  return new Bun.CryptoHasher("sha3-256").update(data).digest("hex");
}
