import { prisma } from "../../index";
import { CreateBannerInput } from "../../schemas/blog/createBannerInputSchema";

type CreateBannerResponse = {
  hasError: boolean;
  message: string | null;
  data: any;
};

export const createBannerUseCase = async ({
  data,
}: {
  data: CreateBannerInput & { imageUrl: string };
}): Promise<CreateBannerResponse> => {
  const post = await prisma.banner.create({ data });

  return {
    hasError: false,
    message: null,
    data: post,
  };
};
