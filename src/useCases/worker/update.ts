import { prisma } from "../../index";
import { UpdateProfessionalInput } from "../../schemas/worker/updateWorker";

export const updateWorkerUseCase = async ({
  data,
  id,
}: {
  data: UpdateProfessionalInput & { photoUrl: string | undefined };
  id: number;
}) => {
  return await prisma.professional.update({
    where: { id },
    data: data,
  });
};
