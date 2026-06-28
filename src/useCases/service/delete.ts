import { prisma } from "../../index";
import { deleteFile } from "../../services/storage";

export const deleteServiceUseCase = async ({ id }: { id: number }) => {
  const service = await prisma.service.delete({
    where: { id },
  });

  if (!service) {
    return null;
  }

  const imageUrl = service.imageUrl;
  const iconUrl = service.iconUrl;
  if (imageUrl) {
    await deleteFile(imageUrl);
  }
  await deleteFile(iconUrl);

  return service;
};
