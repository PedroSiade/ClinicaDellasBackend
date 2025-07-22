import {prisma} from "../../index";


export const getOneUseCase = async ({id}:{id : number}) => {
    const worker = await prisma.professional.findUnique({
        where: { id },
    });

    if (!worker) {
       return null
    }

    return worker
};