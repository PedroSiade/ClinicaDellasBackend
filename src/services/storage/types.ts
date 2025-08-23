export interface FileValidator {
  validate(file: ProcessedFile): ValidationResult;
}

export interface FileNameGenerator {
  generateName(originalName: string): string;
}

export interface StorageProvider {
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

export interface FileProcessor {
  processFile(
    file: Buffer | Uint8Array | File,
    fileName?: string,
  ): Promise<ProcessedFile>;
}

export type FolderType =
  | "banners"
  | "blog"
  | "workers"
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

export interface ProcessedFile {
  buffer: Buffer;
  name: string;
  size: number;
  contentType: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface UploadOptions {
  contentType: string;
  upsert: boolean;
}

export interface StorageUploadResult {
  success: boolean;
  data?: { path: string };
  error?: any;
}
