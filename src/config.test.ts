import { expect, test } from "vitest";
import { parseConfig, type BannerSettings } from "./config";

const testBannerSettings: BannerSettings = {
  acceptText: "I Accept",
  rejectText: "No thanks",
  message: "This is a cookie consent banner",
  themePrimary: "#0165fc",
  themeBackground: "#fff",
  themeText: "#000",
  position: "top",
  cookieDays: 180,
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

test("parseConfig correctly parses a well-formed script tag dataset", () => {
  const newScript = document.createElement("script");

  for (const [key, value] of Object.entries(testBannerSettings)) {
    newScript.dataset[key] = String(value);
  }

  const parsedDataset = parseConfig(newScript);
  expect(parsedDataset).not.toBeNull();

  for (const [key, value] of Object.entries(testBannerSettings)) {
    expect(parsedDataset![key as keyof BannerSettings]!).toBe(value);
  }
});
