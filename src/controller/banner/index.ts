import { Request, Response } from "express";
import { ZodError } from "zod";

import { Prisma } from "@prisma/client";
import { UploadParams } from "../../services/storage/types";
import { getPublicUrl, uploadFile } from "../../services/storage";
import { createBannerInputSchema } from "../../schemas/blog/createBannerInputSchema";
import { createBannerUseCase } from "../../useCases/banner/create";
import { updateBannerInputSchema } from "../../schemas/blog/updateBannerInputSchema";
import { updateBannerUseCase } from "../../useCases/banner/update";
import { deleteBannerUseCase } from "../../useCases/banner/delete";
import { getOneBannerUseCase } from "../../useCases/banner/getOne";

export const getOneBanner = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        hasError: true,
        message: "ID inválido. Deve ser um número.",
      });
    }

    const data = await getOneBannerUseCase({ id });
    if (!data) {
      return res.status(404).json({
        message:
          "Não foi possível encontrar o banner, pois o mesmo não existe.",
        hasError: true,
      });
    }
    return res.status(200).json({
      data,
      hasError: false,
    });
  } catch (error) {
    console.error("Erro ao buscar banner:", error);

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

export const deleteOneBanner = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        hasError: true,
        message: "ID inválido. Deve ser um número.",
      });
    }

    const data = await deleteBannerUseCase({ id });
    if (!data) {
      return res.status(404).json({
        message: "Não foi possível deletar o banner, pois o mesmo não existe.",
        hasError: true,
      });
    }
    return res.status(200).json({
      data,
      hasError: false,
    });
  } catch (error) {
    console.error("Erro ao deletar banner:", error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        hasError: true,
        message: "Banner não encontrado, não pode ser deletado.",
      });
    }

    return res.status(500).json({
      hasError: true,
      error,
    });
  }
};

interface RequestWithFile extends Request {
  file?: Express.Multer.File;
}

export const createBanner = async (req: RequestWithFile, res: Response) => {
  try {
    const parsedBody = createBannerInputSchema.parse(req.body);

    let imageUrl: string | undefined;

    if (req.file) {
      const uploadParams: UploadParams = {
        file: req.file.buffer,
        folder: "banners",
        generateUniqueName: true,
        fileName: req.file.originalname,
      };

      const uploadResult = await uploadFile(uploadParams);
      if (uploadResult.success) {
        imageUrl = getPublicUrl(uploadResult.data?.path as string);
      } else {
        return res.status(400).json({
          hasError: true,
          message: "Erro ao fazer upload da imagem",
          details: uploadResult.error,
        });
      }
    }

    if (!imageUrl) {
      return res.status(400).json({
        hasError: true,
        message: "Imagem é obrigatória para criar um banner",
      });
    }

    const completeData = {
      ...parsedBody,
      imageUrl,
    };

    const data = await createBannerUseCase({ data: completeData });

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

    if (error instanceof Error && error.message.includes("Apenas imagens")) {
      return res.status(400).json({
        hasError: true,
        message: error.message,
      });
    }

    console.error("Erro interno ao criar banner:", error);

    return res.status(500).json({
      hasError: true,
      message: "Erro interno do servidor",
    });
  }
};

export const updateBanner = async (req: RequestWithFile, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ hasError: true, message: "ID inválido" });
    }

    const parsedBody = updateBannerInputSchema.parse(req.body);

    let imageUrl: string | undefined;

    if (req.file) {
      const uploadParams: UploadParams = {
        file: req.file.buffer,
        folder: "banners",
        generateUniqueName: true,
        fileName: req.file.originalname,
      };

      const uploadResult = await uploadFile(uploadParams);
      if (uploadResult.success) {
        imageUrl = getPublicUrl(uploadResult.data?.path as string);
      } else {
        return res.status(400).json({
          hasError: true,
          message: "Erro ao fazer upload da imagem",
          details: uploadResult.error,
        });
      }
    }

    const completeData = {
      ...parsedBody,
      ...(imageUrl && { imageUrl }),
    };

    const data = await updateBannerUseCase({ id, data: completeData });
    return res.status(200).json({ hasError: false, data });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        hasError: true,
        message: "Banner não encontrado, não pode ser atualizado.",
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

    console.error("Erro interno ao atualizar banner:", error);
    return res
      .status(500)
      .json({ hasError: true, message: "Erro interno do servidor" });
  }
};
