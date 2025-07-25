import { prisma } from "../../index";
import { UpdateProfessionalInput } from "../../schemas/worker/updateWorker";
import { UpdatePostInput } from "../../schemas/post/updatePost";

export const updatePostUseCase = async ({
  data,
  id,
}: {
  data: UpdatePostInput;
  id: number;
}) => {
  return await prisma.post.update({
    where: { id },
    data: data,
  });
};
