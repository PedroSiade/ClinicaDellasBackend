import { prisma } from "../../index";
import { CreateBannerInput } from "../../schemas/blog/createBannerInputSchema";

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
  data: CreateBannerInput & { imageUrl?: string | undefined };
}): Promise<UpdateBannerResponse> => {
  const post = await prisma.banner.update({ where: { id }, data });

  return {
    hasError: false,
    message: null,
    data: post,
  };
};
