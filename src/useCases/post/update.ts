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

  if ((data?.featuredImage || data.dropImage) && post?.featuredImage) {
    await deleteFile(post?.featuredImage);
  }

  const { dropImage, photo, ...updateData } = data;
  const updateDataFormat = {
    ...updateData,
    featuredImage: data.dropImage ? null : data.featuredImage,
  };

  return await prisma.post.update({
    where: { id },
    data: updateDataFormat,
  });
};
