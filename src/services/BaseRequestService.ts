import { UploadError } from "./UploadError";

export class BaseRequestService{
    readonly baseUrl:string
    constructor(baseUrl:string){
this.baseUrl =  baseUrl
    }

private handleError(res: Response, url: string): never {
  const status = res.status;
  let message: string;
  let code: string;

  switch (status) {
    case 401: 
      message = "Не авторизован"; 
      code = "Unauthorized"; 
      break;
    case 409: 
      message = "Файл уже существует"; 
      code = "DiskResourceAlreadyExistsError"; 
      break;
    case 429: 
      message = "Слишком много запросов"; 
      code = "RateLimited"; 
      break;
    case 500: 
    case 502: 
    case 503: 
      message = "Ошибка сервера"; 
      code = "ServerError"; 
      break;
    default: 
      message = `HTTP ${status}`; 
      code = `HTTP_${status}`;
  }

  console.error(`Request failed: ${url}`, { status, message, code });
  
  throw new UploadError(message, code);
}
    private buildHeaders(init?: RequestInit): Headers {
        const headers = new Headers(init?.headers || {});
        if (!headers.has("Accept")) headers.set("Accept", "application/json");
        return headers;
      }
    
    async request<T = unknown>(pathOrUrl: string, init?: RequestInit): Promise<T> {
        const isAbsolute = /^https?:\/\//i.test(pathOrUrl);
        const url = isAbsolute ? pathOrUrl : `${this.baseUrl}${pathOrUrl}`;
  
        const fetchOptions: RequestInit = init?.headers ? { ...init } : { ...init, headers: this.buildHeaders(undefined) };
        const res = await fetch(url, fetchOptions);
   
        if (!res.ok) {
          throw this.handleError(res, url);
        }

     const ct = res.headers.get("Content-Type") || "";
       return ct.includes("application/json")
         ? (await res.json()) as T
         : (await res.text()) as T;
      
      }
}