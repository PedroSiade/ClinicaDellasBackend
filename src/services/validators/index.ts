import path from "path";
import {
  FileValidator,
  ProcessedFile,
  ValidationResult,
} from "../storage/types";

export class FileSizeValidator implements FileValidator {
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

export class FileExtensionValidator implements FileValidator {
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

export class CompositeFileValidator implements FileValidator {
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
