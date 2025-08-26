import { useState } from "react";
import type { IFileUploader } from "../services/IFileUploader";
import { UploadError } from "../services/UploadError";

export function useFileUpload(fileUploader: IFileUploader) {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [overwrite, setOverwrite] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    if (selectedFile) setFileName(selectedFile.name);
    setOverwrite(false);
    setError(null);
  };

  const submitFile = async () => {
    if (!file || !fileName.trim()) return;

    setLoading(true);
    setError(null);
    setDownloadUrl(null);

    try {
      const url = await fileUploader.uploadFile(file, fileName, overwrite);
      setDownloadUrl(url);
      setOverwrite(false);
    } catch (err) {
      if (err instanceof UploadError) {
        if (err.code === "DiskResourceAlreadyExistsError") {
          setError("Такой файл уже существует");
          setOverwrite(true);
        } else {
          setError(err.message);
        }
      } 
    } finally {
      setLoading(false);
    }
  };

  return {
    file,
    fileName,
    overwrite,
    setFileName,
    setOverwrite,
    downloadUrl,
    loading,
    error,
    handleFileChange,
    submitFile,
  };
}
