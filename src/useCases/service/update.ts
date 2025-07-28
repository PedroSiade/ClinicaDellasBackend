import { prisma } from "../../index";
import { UpdateServiceInput } from "../../schemas/service/updateService";



export const updateServiceUseCase = async ({
  data,
  id,
}: {
  data: UpdateServiceInput;
  id: number;
}) => {
  return await prisma.service.update({
    where: { id },
    data: data,
  });
};