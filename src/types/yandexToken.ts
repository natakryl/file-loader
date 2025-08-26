export interface YandexToken {
  access_token: string;
  token_type: string;
  expires_in: string;
  cid: string;
  extraData: {
    flag: boolean;
  };
}