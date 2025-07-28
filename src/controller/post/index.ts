import { Request, Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { getManyPostUseCase } from "../../useCases/post/getMany";
import { getOnePostUseCase } from "../../useCases/post/getOne";
import { deletePostUseCase } from "../../useCases/post/delete";
import { createPostSchema } from "../../schemas/post/createPost";
import { createPostUseCase } from "../../useCases/post/create";
import { updatePostSchema } from "../../schemas/post/updatePost";
import { updatePostUseCase } from "../../useCases/post/update";

export const getManyPost = async (req: Request, res: Response) => {
  try {
    const search = (req.query.search as string) || "";
    const page = Number(req.query.page) || 1;
    const data = await getManyPostUseCase({
      search,
      page,
    });

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

export const getOnePost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        hasError: true,
        message: "ID inválido. Deve ser um número.",
      });
    }

    const data = await getOnePostUseCase({ id });
    if (!data) {
      return res.status(404).json({
        message: "Não foi possível encontrar o post, pois o mesmo não existe.",
        hasError: true,
      });
    }
    return res.status(200).json({
      data,
      hasError: false,
    });
  } catch (error) {
    console.error("Erro ao buscar post:", error);

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

export const deleteOnePost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        hasError: true,
        message: "ID inválido. Deve ser um número.",
      });
    }

    const data = await deletePostUseCase({ id });
    if (!data) {
      return res.status(404).json({
        message: "Não foi possível deletar o post, pois o mesmo não existe.",
        hasError: true,
      });
    }
    return res.status(200).json({
      data,
      hasError: false,
    });
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    return res.status(500).json({
      hasError: true,
      error,
    });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const parsedBody = createPostSchema.parse(req.body);

    const data = await createPostUseCase({ data: parsedBody });
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

    console.error("Erro interno ao criar profissional:", error);

    return res.status(500).json({
      hasError: true,
      message: "Erro interno do servidor",
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ hasError: true, message: "ID inválido" });
    }

    const parsedBody = updatePostSchema.parse(req.body);

    const data = await updatePostUseCase({ id, data: parsedBody });

    return res.status(200).json({ hasError: false, data });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        hasError: true,
        message: "Post não encontrado, não pode ser atualizado.",
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

    console.error("Erro interno ao atualizar Post:", error);
    return res
      .status(500)
      .json({ hasError: true, message: "Erro interno do servidor" });
  }
};