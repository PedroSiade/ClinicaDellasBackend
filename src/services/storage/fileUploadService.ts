import { UploadParams, UploadResult } from "../../utils/supabase/upload";
import {
  FileNameGenerator,
  FileProcessor,
  FileValidator,
  StorageProvider,
} from "./types";

export class FileUploadService {
  constructor(
    private storageProvider: StorageProvider,
    private fileProcessor: FileProcessor,
    private fileNameGenerator: FileNameGenerator,
    private validator: FileValidator,
  ) {}

  async uploadFile(params: UploadParams): Promise<UploadResult> {
    try {
      if (!params.file) {
        return { success: false, error: "Arquivo é obrigatório" };
      }

      const processedFile = await this.fileProcessor.processFile(
        params.file,
        params.fileName,
      );

      if (params.contentType) {
        processedFile.contentType = params.contentType;
      }

      const validationResult = this.validator.validate(processedFile);
      if (!validationResult.isValid) {
        return { success: false, error: validationResult.error };
      }

      const finalFileName = params.generateUniqueName
        ? this.fileNameGenerator.generateName(processedFile.name)
        : processedFile.name;

      const fullPath = `${params.folder}/${finalFileName}`;

      const uploadResult = await this.storageProvider.upload(
        fullPath,
        processedFile.buffer,
        {
          contentType: processedFile.contentType,
          upsert: false,
        },
      );

      if (!uploadResult.success) {
        return {
          success: false,
          error: uploadResult.error?.message || "Erro no upload",
        };
      }

      const publicUrl = this.storageProvider.getPublicUrl(
        uploadResult.data!.path,
      );

      return {
        success: true,
        data: {
          path: uploadResult.data!.path,
          publicUrl,
          fileName: finalFileName,
          size: processedFile.size,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  }

  async deleteFile(
    filePath: string,
  ): Promise<{ success: boolean; error?: string }> {
    return this.storageProvider.delete(filePath);
  }

  getPublicUrl(filePath: string): string {
    return this.storageProvider.getPublicUrl(filePath);
  }

  async listFiles(folder: string) {
    return this.storageProvider.listFiles(folder);
  }
}
