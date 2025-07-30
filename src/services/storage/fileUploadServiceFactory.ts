import { FileUploadService } from "../../utils/supabase/upload";
import { FileValidator } from "./types";
import {
  CompositeFileValidator,
  FileExtensionValidator,
  FileSizeValidator,
} from "../validators";
import { StandardFileProcessor } from "../processors/standardFileProcessor";
import { SupabaseStorageProvider } from "../providers/supabaseStorageProvider";
import {
  OriginalFileNameGenerator,
  UniqueFileNameGenerator,
} from "../../utils/fileNameGenerator";

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
