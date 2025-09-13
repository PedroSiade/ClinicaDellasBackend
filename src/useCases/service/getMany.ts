import { prisma } from "../..";

interface GetManyServiceParams {
  search?: string;
}

export const getManyServiceUseCase = async ({ search }: GetManyServiceParams = {}) => {
  const whereClause = search
    ? {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            summary: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        ],
      }
    : {};

  return await prisma.service.findMany({
    where: whereClause,
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
