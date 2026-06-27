import { expect, test } from "vitest";
import { type BannerSettings } from "./config";

const testBannerSettings: BannerSettings = {
  acceptText: "Accept",
  rejectText: "Reject",
  message: "This is a cookie consent banner",
  themePrimary: "#0165fc",
  themeBackground: "#fff",
  themeText: "#000",
  position: "top",
  cookieDays: 365,
  cookieName: "cc-consent",
};

test("Interface to dataset and back converts properly", () => {
  const newScript = document.createElement("script");

  for (const [key, value] of Object.entries(testBannerSettings)) {
    newScript.dataset[key] = String(value);
  }

  for (const [key, value] of Object.entries(newScript.dataset)) {
    expect(value).toBe(String(testBannerSettings[key as keyof BannerSettings]));
  }
});
