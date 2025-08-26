export {};

declare global {
  interface Window {
    YaAuthSuggest?: {
      init: (
        oauthQueryParams: {
          client_id: string;
          response_type: "token";
          redirect_uri?: string; 
        },
        tokenPageOrigin: string, 
        suggestParams?: {
          view: "button";
          parentId?: string;
          buttonView?: "main" | "additional" | "icon" | "iconBG";
          buttonTheme?: "light" | "dark";
          buttonSize?: "xs" | "s" | "m" | "l" | "xl" | "xxl";
          buttonBorderRadius?: number;
          buttonIcon?: "ya" | "yaEng";
          customBgColor?: string;
          customBgHoveredColor?: string;
          customBorderColor?: string;
          customBorderHoveredColor?: string;
          customBorderWidth?: number;
        }
      ) => Promise<{ status: "ok"; handler: () => Promise<any> }>;
    };

    YaSendSuggestToken?: (origin: string, opts?: Record<string, any>) => void;
  }
}
