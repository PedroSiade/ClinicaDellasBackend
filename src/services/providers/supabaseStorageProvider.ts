import { supabaseAdmin } from "../../lib/supabase";
import {
  StorageProvider,
  StorageUploadResult,
  UploadOptions,
} from "../storage/types";

export class SupabaseStorageProvider implements StorageProvider {
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
