import React, { useState } from "react";

export default function FileForm() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !fileName) return;
    console.log("Submit:", { file, fileName });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 400 }}>
      <label>
        Choose file:
        <input type="file" onChange={handleFileChange} />
      </label>

      <label>
        File name:
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="Enter file name"
        />
      </label>

      <button type="submit" disabled={!file || !fileName.trim()}>
        Upload
      </button>
    </form>
  );
}
