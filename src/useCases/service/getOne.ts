import {prisma} from "../../index";

export const getOneServiceUseCase = async ({id}:{id : number}) => {
    const service = await prisma.service.findUnique({
        where: { id },
    });

    if (!service) {
        return null
    }

    return service
};