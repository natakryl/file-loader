import { BaseRequestService } from "./BaseRequestService";
import type { IFileUploader } from "./IFileUploader";

export class YandexFileUploader extends BaseRequestService implements IFileUploader {
  constructor(baseUrl: string = "https://cloud-api.yandex.net/v1/disk") {
    super(baseUrl);
  }

  private getToken(): HeadersInit | undefined {
    const token = localStorage.getItem("Ya.Oauth.Sdk.Token");

    if (!token) return;
    return { Authorization: `OAuth ${token}` };
  }

  async uploadFile(file: File, fileName: string, overwrite = false): Promise<string | null> {
    const path = encodeURIComponent(`/${fileName}`);

    try {
      const { href, method } = await this.request<{ href: string; method?: string }>(
        `/resources/upload?path=${path}&overwrite=${overwrite}`,
        { method: "GET", headers: this.getToken() }
      );

      await this.request<Response>(href, {
        method: method || "PUT",
        body: file,
      });

      const { href: downloadHref } = await this.request<{ href: string }>(
        `/resources/download?path=${path}`,
        { method: "GET", headers: this.getToken() }
      );
      return downloadHref || null;
    } catch (error) {
      throw error;
    }
  }
}
