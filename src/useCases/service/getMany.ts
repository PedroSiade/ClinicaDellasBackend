import { prisma } from "../..";

export const getManyServiceUseCase = async () => {
  return await prisma.service.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      summary: true,
      iconUrl: true,
    },
  });
};
