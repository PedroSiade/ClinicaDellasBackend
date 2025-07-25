import { prisma } from "../../index";
import { CreatePostInput } from "../../schemas/post/createPost";

type CreatePostResponse = {
  hasError: boolean;
  message: string | null;
  data: any; // Pode ser tipado como `Post` se necessário
};

export const createPostUseCase = async ({
  data,
}: {
  data: CreatePostInput;
}): Promise<CreatePostResponse> => {
  const professional = await prisma.professional.findUnique({
    where: { id: data.professionalId },
    select: { id: true },
  });

  if (!professional) {
    return {
      hasError: true,
      message: "Profissional não encontrado para publicação do post.",
      data: null,
    };
  }

  const post = await prisma.post.create({ data });

  return {
    hasError: false,
    message: null,
    data: post,
  };
};
