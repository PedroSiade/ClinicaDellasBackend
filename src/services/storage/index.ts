import { UploadParams, UploadResult } from "./types";
import { FileUploadServiceFactory } from "./fileUploadServiceFactory";
import { UrlToFilePathGenerator } from "../../utils/fileNameGenerator";

export async function uploadFile(params: UploadParams): Promise<UploadResult> {
  const service = FileUploadServiceFactory.createDefault();
  return service.uploadFile(params);
}

export async function deleteFile(
  url: string,
): Promise<{ success: boolean; error?: string }> {
  const service = FileUploadServiceFactory.createCustom({
    GenerateUniqueName: new UrlToFilePathGenerator(),
  });
  return service.deleteFile(url);
}

export function getPublicUrl(filePath: string): string {
  const service = FileUploadServiceFactory.createDefault();
  return service.getPublicUrl(filePath);
}

export async function listFiles(folder: string) {
  const service = FileUploadServiceFactory.createDefault();
  return service.listFiles(folder);
}
