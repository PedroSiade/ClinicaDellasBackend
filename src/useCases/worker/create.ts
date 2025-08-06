import { prisma } from "../../index";
import { CreateProfessionalInput } from "../../schemas/worker/createWorker";
import { UploadParams } from "../../services/storage/types";
import { getPublicUrl, uploadFile } from "../../services/storage";

export const createWorkerUseCase = async ({
  data,
  file,
}: {
  data: CreateProfessionalInput;
  file: Express.Multer.File;
}) => {
  const verifyEmail = await prisma.professional.findUnique({
    where: { email: data.email },
  });
  if (verifyEmail) {
    throw Error(
      "Email informado já possui cadastro, tentar novamente com outro email.",
    );
  }
  const uploadParams: UploadParams = {
    file: file.buffer,
    folder: "workers",
    generateUniqueName: true,
    fileName: file.originalname,
  };

  const uploadResult = await uploadFile(uploadParams);

  if (!uploadResult.success) {
    throw new Error("Erro ao fazer upload da imagem");
  }

  const photoUrl = getPublicUrl(uploadResult.data?.path as string);

  const completeData = {
    ...data,
    photoUrl,
  };

  return await prisma.professional.create({ data: completeData });
};
