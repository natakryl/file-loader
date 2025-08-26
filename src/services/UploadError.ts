export class UploadError extends Error {
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = "UploadError";
    this.code = code;
  }
}