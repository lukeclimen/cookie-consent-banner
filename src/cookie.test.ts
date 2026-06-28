import { afterEach, expect, test } from "vitest";
import { setCookie, getCookie, clearCookie, type CookieFormat } from "./cookie";

const testCookie: CookieFormat = {
  version: 12345,
  choice: "rejected",
};

// Unset any cookies in the jsdom
afterEach(() => {
  document.cookie.split(";").forEach((cookie) => {
    document.cookie = cookie
      .replace(/^ +/, "")
      .replace(/=.*/, `=;expires=${new Date(0).toUTCString()}`);
  });
});

test("getCookie gets a cookie stored in the document", () => {
  const cookieStateBefore = document.cookie;
  expect(cookieStateBefore).toBe("");

  const stringifiedCookie = JSON.stringify(testCookie);
  document.cookie = `test_cookie=${stringifiedCookie}`;

  expect(getCookie("test_cookie")).toEqual(testCookie);
});

test("getCookie returns null if no cookie set", () => {
  const cookieStateBefore = document.cookie;
  expect(cookieStateBefore).toBe("");

  expect(getCookie("test_cookie")).toBeNull();
});

test("getCookie returns null if cookie name incorrect", () => {
  const cookieStateBefore = document.cookie;
  expect(cookieStateBefore).toBe("");

  const stringifiedCookie = JSON.stringify(testCookie);
  document.cookie = `test_cookie=${stringifiedCookie}`;

  expect(getCookie("fake_test_cookie")).toBeNull();
});
