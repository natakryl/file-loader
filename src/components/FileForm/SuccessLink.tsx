import React from "react";

export const SuccessLink: React.FC<{ url: string }> = ({ url }) => (
  <div className="success">
    Файл загружен. <a href={url} target="_blank" rel="noreferrer">Скачать</a>
  </div>
);