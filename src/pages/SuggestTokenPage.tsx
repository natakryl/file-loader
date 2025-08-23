import React, { useEffect } from "react";

export default function SuggestTokenPage() {
  useEffect(() => {
    // Подключаем скрипт для отправки токена обратно
    const script = document.createElement("script");
    script.src =
      "https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js";
    script.async = true;

    script.onload = () => {
      if (!window.YaSendSuggestToken) {
        console.error("YaSendSuggestToken не доступен");
        return;
      }
      try {
        window.YaSendSuggestToken(window.location.origin, { flag: true });
      } catch (e) {
        console.error("Ошибка YaSendSuggestToken:", e);
      }

      setTimeout(() => {
        try { window.close(); } catch {}
      }, 600);
    };

    script.onerror = () => {
      console.error("Не удалось загрузить sdk-suggest-token скрипт");
    };

    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div>Завершаем вход…</div>;
}
