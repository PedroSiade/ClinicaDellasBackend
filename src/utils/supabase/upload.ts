import path from "path";
import { supabaseAdmin } from "../../lib/supabase";

interface FileValidator {
  validate(file: ProcessedFile): ValidationResult;
}

interface FileNameGenerator {
  generateName(originalName: string): string;
}

interface StorageProvider {
  upload(
    filePath: string,
    fileBuffer: Buffer,
    options: UploadOptions,
  ): Promise<StorageUploadResult>;
  delete(filePath: string): Promise<{ success: boolean; error?: string }>;
  getPublicUrl(filePath: string): string;
  listFiles(
    folder: string,
  ): Promise<{ success: boolean; files?: any[]; error?: string }>;
}

interface FileProcessor {
  processFile(
    file: Buffer | Uint8Array | File,
    fileName?: string,
  ): Promise<ProcessedFile>;
}

export type FolderType =
  | "banners"
  | "blog"
  | "services/icon"
  | "services/illustrations"
  | "temp";

export interface UploadParams {
  file: Buffer | Uint8Array | File;
  folder: FolderType;
  fileName?: string;
  contentType?: string;
  generateUniqueName?: boolean;
  allowedExtensions?: string[];
  maxSizeInMB?: number;
}

export interface UploadResult {
  success: boolean;
  data?: {
    path: string;
    publicUrl: string;
    fileName: string;
    size: number;
  };
  error?: string;
}

interface ProcessedFile {
  buffer: Buffer;
  name: string;
  size: number;
  contentType: string;
}

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

interface UploadOptions {
  contentType: string;
  upsert: boolean;
}

interface StorageUploadResult {
  success: boolean;
  data?: { path: string };
  error?: any;
}

class FileSizeValidator implements FileValidator {
  constructor(private maxSizeInMB: number) {}

  validate(file: ProcessedFile): ValidationResult {
    const maxSizeInBytes = this.maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return {
        isValid: false,
        error: `Arquivo muito grande. Máximo permitido: ${this.maxSizeInMB}MB`,
      };
    }
    return { isValid: true };
  }
}

class FileExtensionValidator implements FileValidator {
  constructor(private allowedExtensions: string[]) {}

  validate(file: ProcessedFile): ValidationResult {
    const ext = path.extname(file.name).toLowerCase();
    if (!this.allowedExtensions.includes(ext)) {
      return {
        isValid: false,
        error: `Extensão não permitida. Permitidas: ${this.allowedExtensions.join(", ")}`,
      };
    }
    return { isValid: true };
  }
}
class CompositeFileValidator implements FileValidator {
  constructor(private validators: FileValidator[]) {}

  validate(file: ProcessedFile): ValidationResult {
    for (const validator of this.validators) {
      const result = validator.validate(file);
      if (!result.isValid) {
        return result;
      }
    }
    return { isValid: true };
  }
}

class OriginalFileNameGenerator implements FileNameGenerator {
  generateName(originalName: string): string {
    return originalName;
  }
}

class UniqueFileNameGenerator implements FileNameGenerator {
  generateName(originalName: string): string {
    const ext = path.extname(originalName);
    const nameWithoutExt = path.basename(originalName, ext);
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    return `${nameWithoutExt}-${timestamp}-${randomSuffix}${ext}`;
  }
}

class ContentTypeDetector {
  private static readonly CONTENT_TYPES: { [key: string]: string } = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".pdf": "application/pdf",
    ".mp4": "video/mp4",
    ".mov": "video/quicktime",
  };

  static detect(fileName: string): string {
    const ext = path.extname(fileName).toLowerCase();
    return this.CONTENT_TYPES[ext] || "application/octet-stream";
  }
}

class StandardFileProcessor implements FileProcessor {
  async processFile(
    file: Buffer | Uint8Array | File,
    fileName?: string,
  ): Promise<ProcessedFile> {
    let fileBuffer: Buffer;
    let originalFileName: string;
    let fileSize: number;

    if (file instanceof File) {
      fileBuffer = Buffer.from(await file.arrayBuffer());
      originalFileName = file.name;
      fileSize = file.size;
    } else {
      fileBuffer = Buffer.from(file);
      originalFileName = fileName || "unnamed-file";
      fileSize = fileBuffer.length;
    }

    return {
      buffer: fileBuffer,
      name: originalFileName,
      size: fileSize,
      contentType: ContentTypeDetector.detect(originalFileName),
    };
  }
}

class SupabaseStorageProvider implements StorageProvider {
  constructor(private bucketName: string = "clinica-dellas") {}

  async upload(
    filePath: string,
    fileBuffer: Buffer,
    options: UploadOptions,
  ): Promise<StorageUploadResult> {
    const { data, error } = await supabaseAdmin.storage
      .from(this.bucketName)
      .upload(filePath, fileBuffer, options);
    if (error) {
      return { success: false, error };
    }
    return { success: true, data: { path: data.path } };
  }

  async delete(
    filePath: string,
  ): Promise<{ success: boolean; error?: string }> {
    const { error } = await supabaseAdmin.storage
      .from(this.bucketName)
      .remove([filePath]);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  }

  getPublicUrl(filePath: string): string {
    const { data } = supabaseAdmin.storage
      .from(this.bucketName)
      .getPublicUrl(filePath);
    return data.publicUrl;
  }

  async listFiles(
    folder: string,
  ): Promise<{ success: boolean; files?: any[]; error?: string }> {
    const { data, error } = await supabaseAdmin.storage
      .from(this.bucketName)
      .list(folder);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, files: data };
  }
}

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

      console.log(uploadResult.data!.path);

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

export class FileUploadServiceFactory {
  static createDefault(): FileUploadService {
    const allowedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".gif",
      ".svg",
    ];
    const maxSizeInMB = 10;

    const sizeValidator = new FileSizeValidator(maxSizeInMB);
    const extensionValidator = new FileExtensionValidator(allowedExtensions);
    const compositeValidator = new CompositeFileValidator([
      sizeValidator,
      extensionValidator,
    ]);

    const storageProvider = new SupabaseStorageProvider();
    const fileProcessor = new StandardFileProcessor();
    const nameGenerator = new UniqueFileNameGenerator();

    return new FileUploadService(
      storageProvider,
      fileProcessor,
      nameGenerator,
      compositeValidator,
    );
  }

  static createCustom(options: {
    allowedExtensions?: string[];
    maxSizeInMB?: number;
    generateUniqueName?: boolean;
    bucketName?: string;
  }): FileUploadService {
    const {
      allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"],
      maxSizeInMB = 10,
      generateUniqueName = true,
      bucketName = "clinica-dellas",
    } = options;

    const validators: FileValidator[] = [
      new FileSizeValidator(maxSizeInMB),
      new FileExtensionValidator(allowedExtensions),
    ];
    const compositeValidator = new CompositeFileValidator(validators);

    const storageProvider = new SupabaseStorageProvider(bucketName);
    const fileProcessor = new StandardFileProcessor();
    const nameGenerator = generateUniqueName
      ? new UniqueFileNameGenerator()
      : new OriginalFileNameGenerator();

    return new FileUploadService(
      storageProvider,
      fileProcessor,
      nameGenerator,
      compositeValidator,
    );
  }
}

export async function uploadFile(params: UploadParams): Promise<UploadResult> {
  const service = FileUploadServiceFactory.createDefault();
  return service.uploadFile(params);
}

export async function deleteFile(
  filePath: string,
): Promise<{ success: boolean; error?: string }> {
  const service = FileUploadServiceFactory.createDefault();
  return service.deleteFile(filePath);
}

export function getPublicUrl(filePath: string): string {
  const service = FileUploadServiceFactory.createDefault();
  return service.getPublicUrl(filePath);
}

export async function listFiles(folder: string) {
  const service = FileUploadServiceFactory.createDefault();
  return service.listFiles(folder);
}
