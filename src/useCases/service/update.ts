import { prisma } from "../../index";
import { UpdateServiceInput } from "../../schemas/service/updateService";
import { deleteFile } from "../../services/storage";

export const updateServiceUseCase = async ({
  data,
  id,
}: {
  data: UpdateServiceInput & {
    iconUrl: string | undefined;
    imageUrl: string | undefined;
  };
  id: number;
}) => {
  const service = await prisma.service.findUnique({ where: { id } });
  if ((data.imageUrl || data.dropImage) && service?.imageUrl)
    await deleteFile(service.imageUrl);
  if (data.iconUrl && service) await deleteFile(service.iconUrl);
  const { dropImage, image, icon, ...updateData } = data;
  const updateDataFormat = {
    ...updateData,
    imageUrl: data.dropImage ? null : data.imageUrl,
  };
  return await prisma.service.update({
    where: { id },
    data: updateDataFormat,
  });
};
