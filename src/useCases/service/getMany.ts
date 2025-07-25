import { prisma } from "../..";

export const getManyServiceUseCase = async ({search}: {search: string}) => {
  return await prisma.service.findMany({
    where: {
        OR: [
          { name: { contains: search } },
          { summary: { contains: search } }
        ],
    }, 
    select: {
        id: true,
        name: true,
        summary: true,
        iconUrl: true,
    }   
  });
};