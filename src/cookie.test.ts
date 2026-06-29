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

test("clearCookie clears the named cookie", () => {
  let cookieState = document.cookie;
  expect(cookieState).toBe("");

  document.cookie = "unrelated_cookie=unrelated";

  cookieState = document.cookie;
  expect(cookieState).toBe("unrelated_cookie=unrelated");

  document.cookie = `test_cookie=${JSON.stringify(testCookie)}`;

  cookieState = document.cookie;
  expect(cookieState).not.toBe("unrelated_cookie=unrelated");

  clearCookie("test_cookie");

  cookieState = document.cookie;
  expect(cookieState).toBe("unrelated_cookie=unrelated");

  clearCookie("unrelated_cookie");

  cookieState = document.cookie;
  expect(cookieState).toBe("");
});

test("clearCookie does nothing if no match to named cookie", () => {
  let cookieState = document.cookie;
  expect(cookieState).toBe("");

  document.cookie = `test_cookie=${JSON.stringify(testCookie)}`;

  cookieState = document.cookie;
  expect(cookieState).toBe('test_cookie={"version":12345,"choice":"rejected"}');

  clearCookie("fake_test_cookie");

  cookieState = document.cookie;
  expect(cookieState).toBe('test_cookie={"version":12345,"choice":"rejected"}');
});

test("clearCookie does nothing unless name matches exactly", () => {
  let cookieState = document.cookie;
  expect(cookieState).toBe("");

  document.cookie = `test_cookie=${JSON.stringify(testCookie)}`;

  cookieState = document.cookie;
  expect(cookieState).toBe('test_cookie={"version":12345,"choice":"rejected"}');

  clearCookie("test");
  clearCookie("test_cook");

  cookieState = document.cookie;
  expect(cookieState).toBe('test_cookie={"version":12345,"choice":"rejected"}');
});
