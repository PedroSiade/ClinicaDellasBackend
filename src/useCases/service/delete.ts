import { prisma } from "../../index";

export const deleteServiceUseCase = async ({ id }: { id: number }) => {
  const service = await prisma.service.delete({
    where: { id },
  });

  if (!service) {
    return null;
  }

  return service;
};
