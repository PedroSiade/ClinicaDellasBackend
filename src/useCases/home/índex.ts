import { prisma } from "../../index";

const getBanners = async () => {
  return await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });
};

const getServices = async () => {
  return await prisma.service.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      iconUrl: true,
      summary: true,
    },
    take: 8,
  });
};

const getPosts = async () => {
  return await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
    select: {
      id: true,
      title: true,
      featuredImage: true,
      description: true,
      createdAt: true,
    },
  });
};

export const getHomeDataUseCase = async () => {
  try {
    const [banner, services, posts] = await Promise.all([
      getBanners(),
      getServices(),
      getPosts(),
    ]);
    return { banner, services, posts };
  } catch (error) {
    console.error("Erro ao buscar dados da home:", error);
    throw new Error("Erro interno ao carregar dados da página inicial.");
  }
};
