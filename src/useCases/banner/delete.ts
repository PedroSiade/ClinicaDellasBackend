import { prisma } from "../../index";

export const deleteBannerUseCase = async ({ id }: { id: number }) => {
  const banner = await prisma.banner.delete({
    where: { id },
  });

  if (!banner) {
    return null;
  }

  return banner;
};
