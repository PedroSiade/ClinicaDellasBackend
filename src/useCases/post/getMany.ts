import { prisma } from "../../index";
import { Prisma } from "@prisma/client";

export const getManyPostUseCase = async ({
  search,
  page,
}: {
  search: string;
  page: number;
}) => {
  const itemsPerPage = 9;
  const skip = (page - 1) * itemsPerPage;

  const whereClause: Prisma.PostWhereInput = search
    ? {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const posts = await prisma.post.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    take: itemsPerPage + 1,
    skip: skip,
    select: {
      id: true,
      title: true,
      featuredImage: true,
      description: true,
      createdAt: true,
    },
  });

  const hasNextPage = posts.length > itemsPerPage;
  const data = hasNextPage ? posts.slice(0, itemsPerPage) : posts;

  return {
    data,
    pagination: {
      currentPage: page,
      hasNextPage,
      hasPreviousPage: page > 1,
    },
  };
};
