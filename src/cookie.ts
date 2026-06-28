const COOKIE_SCHEMA_VERSION = 1;

export interface CookieFormat {
  version: number;
  choice: "accepted" | "rejected";
}

export const getCookie = (name: string): CookieFormat | null => {
  const cookies = document.cookie;
  const storedCookie = cookies
    .split("; ")
    .find((value) => value.startsWith(name))
    ?.split("=")[1];

  if (storedCookie) {
    return JSON.parse(storedCookie);
  } else {
    return null;
  }
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
