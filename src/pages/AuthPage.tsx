import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { initYandexAuth } from "../services/AuthService";

export default function AuthPage() {
  const navigate = useNavigate();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    initYandexAuth()
      .then(() => {
        const token = localStorage.getItem("Ya.Oauth.Sdk.Token"); 
        if (token) {
          navigate("/");
        } else {
          console.warn("Токен не найден в localStorage");
        }
      })
      .catch((err) => {
        if (err.code !== "in_progress") {
          console.error("Auth error:", err);
        }
      });
  }, [navigate]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Вход через Яндекс</h1>
      <div id="yaAuthButton" />
    </div>
  );
}
