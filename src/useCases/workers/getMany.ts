import {prisma} from "../../index";
import {Professional} from "@prisma/client";

const divideWorkersByRole = (workers: Professional[]) => {
    const groupedWorkers = {
        owners: [] as Professional[],
        doctor: [] as Professional[],
        physiotherapist: [] as Professional[],
        nutritionist: [] as Professional[],

    };

    for (const worker of workers) {
        switch (worker.role) {
            case 'OWNER':
                groupedWorkers.owners.push(worker);
                break;
            case 'DOCTOR':
                groupedWorkers.doctor.push(worker);
                break;
            case 'PHYSIOTHERAPIST':
                groupedWorkers.physiotherapist.push(worker);
                break
            case 'NUTRITIONIST':
                groupedWorkers.nutritionist.push(worker);
                break;
        }
    }
    return groupedWorkers;
}

export const getManyUseCase = async () => {
    const workers = await prisma.professional.findMany();
    return  divideWorkersByRole(workers);

};