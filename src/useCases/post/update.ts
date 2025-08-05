import { prisma } from "../../index";
import { UpdatePostInput } from "../../schemas/post/updatePost";
import { deleteFile } from "../../services/storage";

export const updatePostUseCase = async ({
  data,
  id,
}: {
  data: UpdatePostInput & { featuredImage: string | undefined };
  id: number;
}) => {
  const post = await prisma.post.findUnique({ where: { id } });
  if (data.featuredImage && post?.featuredImage)
    await deleteFile(post.featuredImage);

  return await prisma.post.update({
    where: { id },
    data: data,
  });
};
