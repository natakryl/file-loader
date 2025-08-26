import React, { useRef } from "react";
import "./FileForm.scss";
import { useFileUpload } from "../../hooks/useFileUpload";

export default function FileForm() {
  const {
    file,
    fileName,
    setFileName,
    handleFileChange,
    submitFile,
    loading,
    error,
    downloadUrl,
    setOverwrite,
  } = useFileUpload();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const formatSize = (size: number) => {
    if (size < 1024) return size + " B";
    if (size < 1024 ** 2) return (size / 1024).toFixed(1) + " KB";
    if (size < 1024 ** 3) return (size / 1024 ** 2).toFixed(1) + " MB";
    return (size / 1024 ** 3).toFixed(1) + " GB";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0] || null;
    handleFileChange(droppedFile);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFile();
  };

  return (
    <form className="file-form" onSubmit={handleSubmit}>
      <h2>Загрузка файла</h2>

      <div
        className="dropzone"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={inputRef}
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          style={{ display: "none" }}
          disabled={loading}
        />
        <p>{fileName || "Перетащите файл сюда или нажмите для выбора"}</p>
      </div>

      {file && (
        <div className="file-info">
          <strong>Файл:</strong> {file.name} <br />
          <strong>Размер:</strong> {formatSize(file.size)}
        </div>
      )}

      <label>
        Имя файла:
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="Введите имя"
          disabled={loading}
        />
      </label>

      {error && (
        <div className="error">
          {error}
          {error.includes("существует") && (
            <button
              type="button"
              onClick={() => {
                const confirmed = window.confirm(
                  "Файл уже существует. Перезаписать?"
                );
                if (confirmed) {
                  setOverwrite(true);
                  submitFile();
                }
              }}
              disabled={loading}
            >
              Перезаписать файл
            </button>
          )}
        </div>
      )}

      <button type="submit" disabled={!file || !fileName.trim() || loading}>
        {loading ? "Загрузка..." : "Загрузить"}
      </button>

      {downloadUrl && (
        <div className="success">
          Файл загружен.{" "}
          <a href={downloadUrl} target="_blank" rel="noreferrer">
            Скачать
          </a>
        </div>
      )}
    </form>
  );
}
