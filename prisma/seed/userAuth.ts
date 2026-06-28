import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function seedUserAuth(prisma: PrismaClient) {
  console.log("Seeding auth users...");

  const adminPassword = await bcrypt.hash("Dellas@2026", 12);

  const admin = await prisma.userAuth.upsert({
    where: { email: "admin@clinicadellas.com" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@clinicadellas.com",
      password: adminPassword,
    },
  });



  console.log(`Created users: ${admin.email}`);
}

async function main() {
  const prisma = new PrismaClient();

  try {
    await seedUserAuth(prisma);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error("Error seeding auth users:", error);
    process.exit(1);
  });
}
