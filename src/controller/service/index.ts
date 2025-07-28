import { Request, Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { getManyServiceUseCase } from "../../useCases/service/getMany";
import { getOneServiceUseCase } from "../../useCases/service/getOne";
import { deleteServiceUseCase } from "../../useCases/service/delete";
import { createServiceSchema } from "../../schemas/service/createService";
import { createServiceUseCase } from "../../useCases/service/create";
import { updateServiceSchema } from "../../schemas/service/updateService";
import { updateServiceUseCase } from "../../useCases/service/update";



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

export const getOneService = async (req: Request, res: Response) => { 
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {  
      return res.status(400).json({
        hasError: true,
        message: "ID inválido. Deve ser um número.",
      });
    }

    const data = await getOneServiceUseCase({ id });
    if(!data) {
      return res.status(404).json({
        message: "Não foi possível encontrar o serviço, pois o mesmo não existe.",
        hasError: true,
      });
    }

    return res.status(200).json({
      data,
      hasError: false,
    });
  } catch (error) {
    console.error("Erro ao buscar serviço:", error);
    
    let message = "Erro desconhecido";

    if(error && typeof error === "object" && "message" in error) {
      message = (error as { message?: string }).message ?? message;
    }

    return res.status(500).json({
      hasError: true,
      message,
    });
  }
};

export const deleteOneService = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        hasError: true,
        message: "ID inválido. Deve ser um número.",
      });
    }

    const data = await deleteServiceUseCase({ id });
    if (!data) {
      return res.status(404).json({
        message: "Não foi possível deletar o serviço, pois o mesmo não existe.",
        hasError: true,
      });
    }
    return res.status(200).json({
      data,
      hasError: false,
    });
  } catch (error) {
    console.error("Erro ao deletar serviço:", error);
    return res.status(500).json({
      hasError: true,
      error,
    });
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
  
export const updateService = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ hasError: true, message: "ID inválido" });
    }

    const parsedBody = updateServiceSchema.parse(req.body);

    const data = await updateServiceUseCase({ id, data: parsedBody });

    return res.status(200).json({ hasError: false, data });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        hasError: true,
        message: "Serviço não encontrado, não pode ser atualizado.",
      });
    }

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

    console.error("Erro interno ao atualizar Serviço:", error);
    return res
      .status(500)
      .json({ hasError: true, message: "Erro interno do servidor" });
  }
};