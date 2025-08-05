import { prisma } from "../../index";
import { UpdateBannerInputSchema } from "../../schemas/blog/updateBannerInputSchema";
import { deleteFile } from "../../services/storage";

type UpdateBannerResponse = {
  hasError: boolean;
  message: string | null;
  data: any;
};

export const updateBannerUseCase = async ({
  data,
  id,
}: {
  id: number;
  data: UpdateBannerInputSchema & { imageUrl?: string | undefined };
}): Promise<UpdateBannerResponse> => {
  const banner = await prisma.banner.findUnique({ where: { id } });
  if (data.imageUrl && banner?.imageUrl) await deleteFile(banner.imageUrl);
  const post = await prisma.banner.update({ where: { id }, data });

  return {
    hasError: false,
    message: null,
    data: post,
  };
};
