export type SeedMode = "prod" | "dev";

export function getSeedMode(): SeedMode {
  const explicit = process.env.SEED_MODE?.toLowerCase();

  if (explicit === "prod" || explicit === "dev") {
    return explicit;
  }

  return process.env.NODE_ENV === "production" ? "prod" : "dev";
}
