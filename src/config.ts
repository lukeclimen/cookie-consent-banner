export interface BannerSettings {
  acceptText: string;
  rejectText: string;
  message: string;
  themePrimary: string;
  themeBackground: string;
  themeText: string;
  position: "top" | "bottom";
  cookieDays: number;
  cookieName: string;
  apiKey?: string;
}

/**
 * This function takes in the current script tag and returns the dataset values.
 *
 * If required values are not provided, the fallback default values will be set.
 * If the current script is null, this function will return null.
 *
 * @param cookieScript
 * @returns An object of the dataset values of the given script tag, or null.
 */
export const parseConfig = (
  cookieScript: HTMLScriptElement,
): BannerSettings | null => {
  if (cookieScript === null) {
    return null;
  } else {
    const dataset = cookieScript.dataset;
    const acceptText = dataset.acceptText ?? "Accept";
    const rejectText = dataset.rejectText ?? "Reject";
    const message = dataset.message ?? "This site uses cookies.";
    const themePrimary = dataset.themePrimary ?? "#2563eb";
    const themeBackground = dataset.themeBackground ?? "#fff";
    const themeText = dataset.themeText ?? "#000";
    // Need to validate the string value given for position
    const pos = dataset.position ?? "bottom";
    const position: "top" | "bottom" =
      pos === "top" || pos === "bottom" ? pos : "bottom";
    const cookieDays = Number(dataset.cookieDays ?? 365);
    const cookieName = dataset.cookieName ?? "cc-consent";
    const apiKey = dataset.apiKey || undefined;

    return {
      acceptText,
      rejectText,
      message,
      themePrimary,
      themeBackground,
      themeText,
      position,
      cookieDays,
      cookieName,
      apiKey,
    };
  }
};
