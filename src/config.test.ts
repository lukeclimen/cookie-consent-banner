import { expect, test } from "vitest";
import { type BannerSettings, DEFAULT_SETTINGS, parseConfig } from "./config";

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

test("parseConfig falls back to all defaults when dataset is empty", () => {
  const script = document.createElement("script");
  const result = parseConfig(script);
  expect(result).not.toBeNull();

  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    expect(result![key as keyof BannerSettings]).toBe(value);
  }
});

test("parseConfig falls back to default cookieDays when given a non-numeric string", () => {
  const input = { ...testBannerSettings, cookieDays: "two-weeks" };

  const script = document.createElement("script");
  for (const [key, value] of Object.entries(input)) {
    script.dataset[key] = String(value);
  }

  const result = parseConfig(script);
  expect(result).not.toBeNull();
  expect(result!.cookieDays).toBe(365);
});

test("parseConfig defaults position to bottom for an unrecognised value", () => {
  const input = { ...testBannerSettings, position: "middle" };
  const expected: BannerSettings = {
    ...testBannerSettings,
    position: "bottom",
  };

  const script = document.createElement("script");
  for (const [key, value] of Object.entries(input)) {
    script.dataset[key] = String(value);
  }

  const result = parseConfig(script);
  expect(result).not.toBeNull();

  for (const [key, value] of Object.entries(expected)) {
    expect(result![key as keyof BannerSettings]).toBe(value);
  }
});

test("parseConfig falls back to default colours for invalid hex strings", () => {
  const input: BannerSettings = {
    ...testBannerSettings,
    themePrimary: "#gggggg",
    themeBackground: "not-a-colour",
    themeText: "12345",
  };
  const expected: BannerSettings = {
    ...testBannerSettings,
    themePrimary: "#2563eb",
    themeBackground: "#fff",
    themeText: "#000",
  };

  const script = document.createElement("script");
  for (const [key, value] of Object.entries(input)) {
    script.dataset[key] = String(value);
  }

  const result = parseConfig(script);
  expect(result).not.toBeNull();

  for (const [key, value] of Object.entries(expected)) {
    expect(result![key as keyof BannerSettings]).toBe(value);
  }
});

test("parseConfig returns null if passed in a null values", () => {
  expect(parseConfig(null)).toBeNull();
});
