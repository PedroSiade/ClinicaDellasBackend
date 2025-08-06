import { Request, Response } from "express";
import { getManyWorkerPageUseCase } from "../../useCases/worker/getManyPage";
import { getOneUseCase } from "../../useCases/worker/getOne";
import { deleteUseCase } from "../../useCases/worker/delete";
import { createProfessionalInputSchema } from "../../schemas/worker/createWorker";
import { ZodError } from "zod";
import { createWorkerUseCase } from "../../useCases/worker/create";
import { updateProfessionalInputSchema } from "../../schemas/worker/updateWorker";
import { updateWorkerUseCase } from "../../useCases/worker/update";
import { Prisma } from "@prisma/client";
import { getManyWorkerUseCase } from "../../useCases/worker/getMany";

export const getManyWorker = async (req: Request, res: Response) => {
  try {
    const data = await getManyWorkerUseCase();

    return res.status(200).json({
      data,
      hasError: false,
    });
  } catch (error) {
    console.error("Erro ao buscar profissionais:", error);
    return res.status(500).json({
      hasError: true,
      message: "Erro interno do servidor.",
    });
  }
};

export const getManyWorkerPage = async (req: Request, res: Response) => {
  try {
    const data = await getManyWorkerPageUseCase();

    return res.status(200).json({
      data,
      hasError: false,
    });
  } catch (error) {
    console.error("Erro ao buscar profissionais:", error);
    return res.status(500).json({
      hasError: true,
      message: "Erro interno do servidor.",
    });
  }
};

export const getOneWorker = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        hasError: true,
        message: "ID inválido. Deve ser um número.",
      });
    }

    const data = await getOneUseCase({ id });
    if (!data) {
      return res.status(404).json({
        message:
          "Não foi possível encontrar o profissional, pois o mesmo não existe.",
        hasError: true,
      });
    }
    return res.status(200).json({
      data,
      hasError: false,
    });
  } catch (error) {
    console.error("Erro ao buscar profissional:", error);

    let message = "Erro desconhecido";

    if (error && typeof error === "object" && "message" in error) {
      message = (error as { message?: string }).message ?? message;
    }

    return res.status(500).json({
      hasError: true,
      message,
    });
  }
};

export const deleteOneWorker = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        hasError: true,
        message: "ID inválido. Deve ser um número.",
      });
    }

    const data = await deleteUseCase({ id });
    if (!data) {
      return res.status(404).json({
        message:
          "Não foi possível deletar o profissional, pois o mesmo não existe.",
        hasError: true,
      });
    }
    return res.status(200).json({
      data,
      hasError: false,
    });
  } catch (error) {
    console.error("Erro ao deletar profissional:", error);
    return res.status(500).json({
      hasError: true,
      error,
    });
  }
};

interface RequestWithFile extends Request {
  file?: Express.Multer.File;
}
export const createWorker = async (req: RequestWithFile, res: Response) => {
  try {
    const parsedBody = createProfessionalInputSchema.parse(req.body);

    if (!req.file) {
      return res.status(400).json({
        hasError: true,
        message: "É obrigatório enviar uma imagem para o profissional.",
      });
    }

    const data = await createWorkerUseCase({
      data: parsedBody,
      file: req.file,
    });

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

    if (error instanceof Error) {
      return res.status(400).json({
        hasError: true,
        message: error.message,
      });
    }

    console.error("Erro interno ao criar profissional:", error);

    return res.status(500).json({
      hasError: true,
      message: "Erro interno do servidor",
    });
  }
};

export const updateWorker = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ hasError: true, message: "ID inválido" });
    }

    const parsedBody = updateProfessionalInputSchema.parse(req.body);

    const data = await updateWorkerUseCase({
      id,
      data: parsedBody,
      file: req.file || null,
    });

    return res.status(200).json({ hasError: false, data });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        hasError: true,
        message: "Profissional não encontrado, não pode ser atualizado.",
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

    // Erros específicos do upload
    if (
      error instanceof Error &&
      error.message.includes("Erro ao fazer upload")
    ) {
      return res.status(400).json({
        hasError: true,
        message: error.message,
      });
    }

    console.error("Erro interno ao atualizar profissional:", error);
    return res
      .status(500)
      .json({ hasError: true, message: "Erro interno do servidor" });
  }
};
