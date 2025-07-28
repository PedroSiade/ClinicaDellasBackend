import { prisma } from "../../index";
import { CreateServiceInput } from "../../schemas/service/createService";

type CreateServiceResponse = {
  hasError: boolean;
  message: string | null;
  data: any;
};

export const createServiceUseCase = async ({
  data,
}: {
  data: CreateServiceInput;
}): Promise<CreateServiceResponse> => {
  const service = await prisma.service.create({ data });

  return {
    hasError: false,
    message: null,
    data: service,
  };
};
