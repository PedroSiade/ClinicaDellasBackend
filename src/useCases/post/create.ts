import { prisma } from "../../index";
import { CreatePostInput } from "../../schemas/post/createPost";

type CreatePostResponse = {
  hasError: boolean;
  message: string | null;
  data: any;
};

export const createPostUseCase = async ({
  data,
}: {
  data: CreatePostInput & { featuredImage: string | undefined };
}): Promise<CreatePostResponse> => {
  const professional = await prisma.professional.findUnique({
    where: { id: data.professionalId },
    select: { id: true },
  });

  if (!professional || !data.professionalId) {
    return {
      hasError: true,
      message: "Profissional não encontrado para publicação do post.",
      data: null,
    };
  }

  const { professionalId, ...rest } = data;

  const post = await prisma.post.create({
    data: {
      ...rest,
      professional: {
        connect: { id: professionalId },
      },
    },
  });
  return {
    hasError: false,
    message: null,
    data: post,
  };
};
