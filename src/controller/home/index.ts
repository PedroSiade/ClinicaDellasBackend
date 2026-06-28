import { Request, Response } from "express";
import { getHomeDataUseCase } from "../../useCases/home/índex";

export const getHomeData = async (req: Request, res: Response) => {
  try {
    const data = await getHomeDataUseCase();

    return res.status(200).json({
      data,
      hasError: false,
    });
  } catch (error: any) {
    console.error("Erro ao buscar profissionais:", error);

    return res.status(500).json({
      hasError: true,
      message:
        error?.message && typeof error.message === "string"
          ? error.message
          : "Erro interno do servidor. Por favor, tente novamente mais tarde.",
    });
  }
};
