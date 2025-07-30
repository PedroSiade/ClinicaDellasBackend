import { prisma } from "../../index";
import { CreateProfessionalInput } from "../../schemas/worker/createWorker";

export const createWorkerUseCase = async ({
  data,
}: {
  data: CreateProfessionalInput;
}) => {
  return await prisma.professional.create({ data });
};
