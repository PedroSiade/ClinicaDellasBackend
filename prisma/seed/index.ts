import { PrismaClient } from "@prisma/client";
import { seedBanners } from "./banner";
import { seedPosts } from "./posts";
import { seedServices } from "./service";
import { seedUserAuth } from "./userAuth";
import { seedProfessionals } from "./workers";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting full database seed...\n");

  await seedUserAuth(prisma);
  await seedProfessionals(prisma);
  await seedServices(prisma);
  await seedBanners(prisma);
  await seedPosts(prisma);

  console.log("\nFull database seed completed successfully!");
}

main()
  .catch((error) => {
    console.error("Error during full database seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
