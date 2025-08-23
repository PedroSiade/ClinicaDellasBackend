import { prisma } from "../../index";
import { deleteFile } from "../../services/storage";

export const deleteBannerUseCase = async ({ id }: { id: number }) => {
  const banner = await prisma.banner.delete({
    where: { id },
  });

  if (!banner) {
    return null;
  }

  const imageUrl = banner.imageUrl;
  await deleteFile(imageUrl);
  return banner;
};
