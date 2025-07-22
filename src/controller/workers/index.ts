

import { prisma } from "../../index";
import { Request, Response } from "express";

export const getWorkers = async (req: Request, res: Response) => {
    try {
        const workers = await prisma.professional.findMany({
            select: {
                id: true,
                name: true,
                photoUrl: true,
                description: true,
                phone: true,
                email: true,
                isActive: true,
            },
        });
        console.log('o')
        console.log(workers);
        return res.status(200).json(workers);
    } catch (error) {
        console.error("Erro ao buscar profissionais:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};
