import { prisma } from "../../index";
import { Professional } from "@prisma/client";

export const getManyWorkerUseCase = async () => {
  const workers = await prisma.professional.findMany({
    select: {
      id: true,
      name: true,
      role: true,
      photoUrl: true,
    },
  });
  return workers;
};
