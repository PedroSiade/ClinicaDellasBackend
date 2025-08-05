import { prisma } from "../../index";
import { UpdateProfessionalInput } from "../../schemas/worker/updateWorker";
import { deleteFile } from "../../services/storage";

export const updateWorkerUseCase = async ({
  data,
  id,
}: {
  data: UpdateProfessionalInput & { photoUrl: string | undefined };
  id: number;
}) => {
  const post = await prisma.professional.findUnique({ where: { id } });
  if (data.photoUrl && post?.photoUrl) await deleteFile(post.photoUrl);

  return await prisma.professional.update({
    where: { id },
    data: data,
  });
};
