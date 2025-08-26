import { getYandexToken } from "./AuthService";

interface UploadOptions {
  file: File;
  fileName: string;
  overwrite?: boolean;
}

export async function uploadFileToYandexDisk({
  file,
  fileName,
  overwrite = false,
}: UploadOptions): Promise<string | null> {
    const token = getYandexToken();

  const path = encodeURIComponent(`/${fileName}`);
  const uploadUrl = `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${path}&overwrite=${overwrite}`;

  //Запрашиваем URL для загрузки
  const uploadLinkResponse = await fetch(uploadUrl, {
    method: "GET",
    headers: { Authorization: `OAuth ${token}` },
  });

  if (!uploadLinkResponse.ok) {
    let errJson: any = null;
    try { errJson = await uploadLinkResponse.json(); } catch {}
    if (uploadLinkResponse.status === 409) {
      const error: any = new Error("Файл уже существует");
      error.code = "DiskResourceAlreadyExistsError"; 
      throw error;
    }
    throw new Error(errJson?.message || `Ошибка получения URL загрузки: ${uploadLinkResponse.status}`);
  }

  const { href, method } = await uploadLinkResponse.json();

  const uploadResponse = await fetch(href, {
    method: method || "PUT",
    body: file,
  });

  if (!(uploadResponse.status === 201 || uploadResponse.status === 202)) {
    throw new Error(`Ошибка загрузки файла: ${uploadResponse.status}`);
  }

  const downloadLinkResponse = await fetch(
    `https://cloud-api.yandex.net/v1/disk/resources/download?path=${path}`,
    { headers: { Authorization: `OAuth ${token}` } }
  );

  if (!downloadLinkResponse.ok) {
    return null;
  }

  const { href: downloadHref } = await downloadLinkResponse.json();
  return downloadHref || null;
}
