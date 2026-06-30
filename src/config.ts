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
export const parseConfig = (cookieScript: HTMLScriptElement | null): BannerSettings | null => {
  if (cookieScript === null) {
    return null;
  } else {
    const dataset = cookieScript.dataset;
    const acceptText = dataset.acceptText ?? "Accept";
    const rejectText = dataset.rejectText ?? "Reject";
    const message = dataset.message ?? "This site uses cookies.";
    // Valdiate hex codes
    let themePrimary = dataset.themePrimary;
    if (!themePrimary || !validateHexCode(themePrimary)) themePrimary = "#2563eb";
    let themeBackground = dataset.themeBackground;
    if (!themeBackground || !validateHexCode(themeBackground)) themeBackground = "#fff";
    let themeText = dataset.themeText;
    if (!themeText || !validateHexCode(themeText)) themeText = "#000";
    // Validate the string value given for position
    const pos = dataset.position ?? "bottom";
    const position: "top" | "bottom" = pos === "top" || pos === "bottom" ? pos : "bottom";
    // Validate against NaN
    const cookieDaysRaw = Number(dataset.cookieDays ?? 365);
    const cookieDays = isNaN(cookieDaysRaw) ? 365 : cookieDaysRaw;
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

/**
 * Given a string, return true if it's a valid hex code, false otherwise.
 *
 * @param hexCode
 */
const validateHexCode = (hexCode: string): boolean => {
  const validHexRegex: RegExp = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;

  return validHexRegex.test(hexCode);
};
