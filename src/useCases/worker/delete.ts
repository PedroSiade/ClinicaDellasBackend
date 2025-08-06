import { prisma } from "../../index";
import { deleteFile } from "../../services/storage";

export const deleteUseCase = async ({ id }: { id: number }) => {
  const worker = await prisma.professional.delete({
    where: { id },
  });

  if (!worker) {
    return null;
  }
  const imageUrl = worker?.photoUrl;
  await deleteFile(imageUrl);

  return worker;
};
