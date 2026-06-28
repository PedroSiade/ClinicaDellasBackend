import { PrismaClient } from "@prisma/client";
import { seedBanners } from "./banner";
import { getSeedMode } from "./mode";
import { seedPosts } from "./posts";
import { seedServices } from "./service";
import { seedUserAuth } from "./userAuth";
import { seedProfessionals } from "./workers";

const prisma = new PrismaClient();

async function main() {
  const mode = getSeedMode();
  console.log(`Starting database seed (mode: ${mode})...\n`);

  await seedUserAuth(prisma);

  if (mode === "dev") {
    await seedProfessionals(prisma);
    await seedServices(prisma);
    await seedBanners(prisma);
    await seedPosts(prisma);
  }

  console.log(`\nDatabase seed completed successfully (${mode})!`);
}

main()
  .catch((error) => {
    console.error("Error during database seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
