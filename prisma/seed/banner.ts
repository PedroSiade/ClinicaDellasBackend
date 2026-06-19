import { PrismaClient } from "@prisma/client";

type Banner = {
  imageUrl: string;
  altText: string;
  linkUrl: string;
};

const bannersData: Banner[] = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=400&fit=crop",
    altText: "Cuidado integral para a saúde da mulher",
    linkUrl: "/servicos",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&h=400&fit=crop",
    altText: "Acompanhamento pré-natal completo",
    linkUrl: "/servicos",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&h=400&fit=crop",
    altText: "Equipe multidisciplinar especializada",
    linkUrl: "/profissionais",
  },
];

export async function seedBanners(prisma: PrismaClient) {
  console.log("Seeding banners...");

  await prisma.banner.deleteMany({});

  for (const banner of bannersData) {
    const created = await prisma.banner.create({ data: banner });
    console.log(`Created banner: ${created.altText}`);
  }

  console.log(`Successfully seeded ${bannersData.length} banners!`);
}

async function main() {
  const prisma = new PrismaClient();

  try {
    await seedBanners(prisma);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error("Error seeding banners:", error);
    process.exit(1);
  });
}
