import { prisma } from "../../index";

export const getManyPostUseCase = async ({
  search,
  page,
}: {
  search: string;
  page: number;
}) => {
  return await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 9,
    skip: (page - 1) * 9,
    select: {
      id: true,
      title: true,
      featuredImage: true,
      description: true,
      createdAt: true,
    },
  });
};
