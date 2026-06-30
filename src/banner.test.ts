import { afterEach, expect, test } from "vitest";
import { createBanner } from "./banner";
import type { BannerSettings } from "./config";

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

afterEach(() => {
  document.body.innerHTML = "";
});

test("Test that banner renders with components in DOM", () => {
  const banner = createBanner(
    testBannerSettings,
    () => {},
    () => {},
  );
  banner.show();

  const cookieBanner = document.getElementById("cookie-consent-banner");
  expect(cookieBanner).not.toBeNull();
  expect(cookieBanner?.children.length).toBe(4);
});

test("Test that banner is removed with hide", () => {
  const banner = createBanner(
    testBannerSettings,
    () => {},
    () => {},
  );
  banner.show();

  let cookieBanner = document.getElementById("cookie-consent-banner");
  expect(cookieBanner).not.toBeNull();

  banner.hide();

  cookieBanner = document.getElementById("cookie-consent-banner");
  expect(cookieBanner).toBeNull();
});

test("Test that banner is removed with hide", () => {
  const banner = createBanner(
    testBannerSettings,
    () => {},
    () => {},
  );
  banner.show();

  let cookieBanner = document.getElementById("cookie-consent-banner");
  expect(cookieBanner).not.toBeNull();

  banner.hide();

  cookieBanner = document.getElementById("cookie-consent-banner");
  expect(cookieBanner).toBeNull();
});
