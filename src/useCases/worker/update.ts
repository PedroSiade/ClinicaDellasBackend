import { prisma } from "../../index";
import { UpdateProfessionalInput } from "../../schemas/worker/updateWorker";
import { deleteFile, getPublicUrl, uploadFile } from "../../services/storage";
import { UploadParams } from "../../services/storage/types";

export const updateWorkerUseCase = async ({
  data,
  id,
  file,
}: {
  data: UpdateProfessionalInput;
  id: number;
  file: Express.Multer.File | null;
}) => {
  // Buscar profissional existente
  const existingWorker = await prisma.professional.findUnique({
    where: { id },
  });

  if (!existingWorker) {
    throw new Error("Profissional não encontrado");
  }

  const verifyEmail = await prisma.professional.findUnique({
    where: { email: data.email },
  });
  if (verifyEmail && existingWorker.id !== verifyEmail.id) {
    throw Error(
      "Email informado já possui cadastro, tentar novamente com outro email.",
    );
  }

  const updateData: UpdateProfessionalInput & { photoUrl?: string } = {
    ...data,
    photoUrl: undefined,
  };

  if (file) {
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
    updateData.photoUrl = photoUrl;

    if (existingWorker.photoUrl) {
      await deleteFile(existingWorker.photoUrl);
    }
  }

  return await prisma.professional.update({
    where: { id },
    data: updateData,
  });
};
