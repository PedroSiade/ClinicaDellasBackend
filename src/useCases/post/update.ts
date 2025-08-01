import { prisma } from "../../index";
import { UpdatePostInput } from "../../schemas/post/updatePost";

export const updatePostUseCase = async ({
  data,
  id,
}: {
  data: UpdatePostInput & { featuredImage: string | undefined };
  id: number;
}) => {
  return await prisma.post.update({
    where: { id },
    data: data,
  });
};
