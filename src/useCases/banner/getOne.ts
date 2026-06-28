import { prisma } from "../../index";

export const getOneBannerUseCase = async ({ id }: { id: number }) => {
  const banner = await prisma.banner.findUnique({
    where: { id },
  });

  if (!banner) {
    return null;
  }

  return banner;
};
