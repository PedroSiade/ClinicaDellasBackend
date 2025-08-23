import path from "path";
import { FileNameGenerator } from "../services/storage/types";

export class OriginalFileNameGenerator implements FileNameGenerator {
  generateName(originalName: string): string {
    return originalName;
  }
}

export class UniqueFileNameGenerator implements FileNameGenerator {
  generateName(originalName: string): string {
    const ext = path.extname(originalName);
    const nameWithoutExt = path.basename(originalName, ext);
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    return `${nameWithoutExt}-${timestamp}-${randomSuffix}${ext}`;
  }
}

export class UrlToFilePathGenerator implements FileNameGenerator {
  generateName(originalName: string): string {
    console.log(originalName);
    const parts = originalName.split("/clinica-dellas/");
    console.log(parts);
    return parts[1] ?? "";
  }
}
