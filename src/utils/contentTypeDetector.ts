import path from "path";

export class ContentTypeDetector {
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
