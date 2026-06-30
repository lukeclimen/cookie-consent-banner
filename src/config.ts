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

export const DEFAULT_SETTINGS: Omit<BannerSettings, "apiKey"> = {
  acceptText: "Accept",
  rejectText: "Reject",
  message:
    "This website uses cookies to enhance our browsing experience and provide personalized content.",
  themePrimary: "#2563eb",
  themeBackground: "#fff",
  themeText: "#000",
  position: "bottom",
  cookieDays: 365,
  cookieName: "cc-consent",
};

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
    const acceptText = dataset.acceptText ?? DEFAULT_SETTINGS.acceptText;
    const rejectText = dataset.rejectText ?? DEFAULT_SETTINGS.rejectText;
    const message = dataset.message ?? DEFAULT_SETTINGS.message;
    // Valdiate hex codes
    let themePrimary = dataset.themePrimary;
    if (!themePrimary || !validateHexCode(themePrimary))
      themePrimary = DEFAULT_SETTINGS.themePrimary;
    let themeBackground = dataset.themeBackground;
    if (!themeBackground || !validateHexCode(themeBackground))
      themeBackground = DEFAULT_SETTINGS.themeBackground;
    let themeText = dataset.themeText;
    if (!themeText || !validateHexCode(themeText)) themeText = DEFAULT_SETTINGS.themeText;
    // Validate the string value given for position
    const pos = dataset.position ?? DEFAULT_SETTINGS.position;
    const position: "top" | "bottom" =
      pos === "top" || pos === "bottom" ? pos : DEFAULT_SETTINGS.position;
    // Validate against NaN
    const cookieDaysRaw = Number(dataset.cookieDays ?? DEFAULT_SETTINGS.cookieDays);
    const cookieDays = isNaN(cookieDaysRaw) ? DEFAULT_SETTINGS.cookieDays : cookieDaysRaw;
    const cookieName = dataset.cookieName ?? DEFAULT_SETTINGS.cookieName;
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
