import {Request, Response} from "express";
import { ZodError } from "zod";
import { getManyServiceUseCase } from "../../useCases/service/getMany";
import { createServiceSchema } from "../../schemas/service/createService";
import { createServiceUseCase } from "../../useCases/service/create";



export const getManyService = async (req: Request, res: Response) => {
    try {
        const search = (req.query.search as string) || "";
        const data = await getManyServiceUseCase({search: search})

        return res.status(200).json({
            data,
            hasError: false,
        });
    } catch (error) {
        console.error("Erro ao buscar services:", error);
        return res.status(500).json({
            hasError: true,
            message: "Erro interno do servidor." });
    }
};

export const createService = async (req: Request, res: Response) => {
    try {
      const parsedBody = createServiceSchema.parse(req.body);
  
      const data = await createServiceUseCase({ data: parsedBody });
      if (!data.data) return res.status(404).json(data);
      return res.status(201).json({
        hasError: false,
        data,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          hasError: true,
          message: "Erro de validação",
          issues: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }
  
      console.error("Erro interno ao criar service:", error);
  
      return res.status(500).json({
        hasError: true,
        message: "Erro interno do servidor",
      });
    }
};
  