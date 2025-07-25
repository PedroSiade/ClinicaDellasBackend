import { prisma } from "../../index";

export const getOnePostUseCase = async ({ id }: { id: number }) => {
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    return null;
  }

  return post;
};
