import { FileProcessor, ProcessedFile } from "../storage/types";
import { ContentTypeDetector } from "../../utils/contentTypeDetector";

export class StandardFileProcessor implements FileProcessor {
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
