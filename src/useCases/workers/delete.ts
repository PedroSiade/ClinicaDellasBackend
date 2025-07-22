import {prisma} from "../../index";


export const deleteUseCase = async ({id}:{id : number}) => {
    const worker = await prisma.professional.delete({
        where: { id },
    });

    if (!worker) {
        return null
    }

    return worker
};