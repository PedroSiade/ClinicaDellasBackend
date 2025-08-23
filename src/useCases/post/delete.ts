import { prisma } from "../../index";
import { deleteFile } from "../../services/storage";

export const deletePostUseCase = async ({ id }: { id: number }) => {
  const post = await prisma.post.delete({
    where: { id },
  });

  if (!post) {
    return null;
  }
  const imageUrl = post?.featuredImage;
  if (imageUrl) {
    await deleteFile(imageUrl);
  }

  return post;
};
