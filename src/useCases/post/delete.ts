import { prisma } from "../../index";

export const deletePostUseCase = async ({ id }: { id: number }) => {
  const post = await prisma.post.delete({
    where: { id },
  });

  if (!post) {
    return null;
  }

  return post;
};
