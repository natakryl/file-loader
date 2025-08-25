import React from "react";
import { useFileUpload } from "../../hooks/useFileUpload";

export default function FileForm() {
  const {
    file,
    fileName,
    setFileName,
    downloadUrl,
    loading,
    error,
    handleFileChange,
    submitFile,
  } = useFileUpload();

  const formatSize = (size: number) => {
    if (size < 1024) return size + " B";
    if (size < 1024 ** 2) return (size / 1024).toFixed(1) + " KB";
    if (size < 1024 ** 3) return (size / 1024 ** 2).toFixed(1) + " MB";
    return (size / 1024 ** 3).toFixed(1) + " GB";
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ display: "grid", gap: 12, maxWidth: 400 }}>
      <label>
        Choose file:
        <input
          type="file"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          disabled={loading}
        />
      </label>

      {file && <div>File: {file.name} ({formatSize(file.size)})</div>}

      <label>
        File name:
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          disabled={loading}
        />
      </label>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <button type="button" onClick={submitFile} disabled={!file || !fileName.trim() || loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {downloadUrl && (
        <div>
          File uploaded. <a href={downloadUrl} target="_blank" rel="noreferrer">Download</a>
        </div>
      )}
    </form>
  );
}
