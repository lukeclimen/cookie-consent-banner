// biome-ignore-all lint/suspicious/noDocumentCookie: Cookie Store API lacks Firefox support

// const COOKIE_SCHEMA_VERSION = 1;

export interface CookieFormat {
  version: number;
  choice: "accepted" | "rejected";
}

export const getCookie = (name: string): CookieFormat | null => {
  const cookies = document.cookie;
  const permissionCookie = cookies.split("; ").find((value) => value.startsWith(`${name}=`));
  const cookieEqualIndex = permissionCookie?.indexOf("=");
  if (permissionCookie && cookieEqualIndex) {
    const storedCookie = permissionCookie.slice(cookieEqualIndex + 1);

    if (storedCookie) {
      return JSON.parse(storedCookie);
    }
  }
  return null;
};

// export const setCookie = (
//   name: string,
//   value: "accepted" | "rejected",
//   daysToLive: number,
// ): void => {
//   return;
// };

export const clearCookie = (name: string): void => {
  document.cookie = `${name}=; expires=${new Date(0).toUTCString()}`;
};
