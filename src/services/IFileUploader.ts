export interface IFileUploader {
  uploadFile(file: File, fileName: string, overwrite?: boolean): Promise<string | null>;
}