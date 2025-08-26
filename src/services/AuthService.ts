const CLIENT_ID = "c22a6ba7662d40b99c6823c31d6461ac";
const REDIRECT_PATH = "/suggest/token";

// подключение SDK
function loadSdk(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.YaAuthSuggest) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Не удалось загрузить sdk-suggest"));
    document.head.appendChild(script);
  });
}

// инициализация и авторизация
export async function initYandexAuth(): Promise<any> {
  await loadSdk();

  const origin = window.location.origin;
  const redirectUri = `${origin}${REDIRECT_PATH}`;

  if (!window.YaAuthSuggest) {
    throw new Error("YaAuthSuggest недоступен (может блокировать AdBlock)");
  }

  const { handler } = await window.YaAuthSuggest.init(
    {
      client_id: CLIENT_ID,
      response_type: "token",
      redirect_uri: redirectUri,
    },
    origin,
    {
      view: "button",
      parentId: "yaAuthButton",
      buttonView: "main",
      buttonTheme: "light",
      buttonSize: "m",
      buttonBorderRadius: 8,
    }
  );

  return handler();
}

export function getYandexToken(): string | null {
  return localStorage.getItem("Ya.Oauth.Sdk.Token");
}
