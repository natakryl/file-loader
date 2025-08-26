import React from "react";

interface Props {
  url: string;
}

export const SuccessLink: React.FC<Props> = ({ url }) => (
  <div className="success">
    Файл загружен. <a href={url} target="_blank" rel="noreferrer">Скачать</a>
  </div>
);