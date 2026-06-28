const COOKIE_SCHEMA_VERSION = 1;

export interface CookieFormat {
  name: string;
  version: number;
  choice: "accepted" | "rejected";
}

export const getCookie = (name: string): CookieFormat | null => {
  return {
    name: "cc_cookie",
    version: COOKIE_SCHEMA_VERSION,
    choice: "accepted",
  };
};

export const setCookie = (
  name: string,
  value: "accepted" | "rejected",
  daysToLive: number,
): void => {
  return;
};

export const clearCookie = (name: string): void => {
  return;
};
