import { useState } from "react";
import { uploadFileToYandexDisk } from "../services/FileService";

export function useFileUpload() {
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
      const url = await uploadFileToYandexDisk({ file, fileName, overwrite });
      setDownloadUrl(url);
      setOverwrite(false);
    } catch (err: any) {
      if (err?.code === "DiskResourceAlreadyExistsError") {
        setError("Такой файл уже существует");
        setOverwrite(true);
      } else {
        setError(err?.message || "Ошибка загрузки файла");
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
