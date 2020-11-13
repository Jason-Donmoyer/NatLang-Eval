import {
  checkForValidUrl
} from "../src/client/js/validityCheck";

describe("check for valid url protocol", () => {
  test("should return true", () => {
    const userInputUrl = "https://www.udacity.com";
    expect(checkForValidUrl(userInputUrl)).toBe(true);
  });
  test("should return true", () => {
    const userInputUrl = "http://www.udacity.com";
    expect(checkForValidUrl(userInputUrl)).toBe(true);
  });
});

describe("check without valid url protocol", () => {
  test("should return true", () => {
    const userInputUrl = "www.udacity.com";
    expect(checkForValidUrl(userInputUrl)).toBe(true);
  });
  test("should return true", () => {
    const userInputUrl = "udacity.com";
    expect(checkForValidUrl(userInputUrl)).toBe(true);
  });
  test("should return false", () => {
    const userInputUrl = "udacity . com";
    expect(checkForValidUrl(userInputUrl)).toBe(false);
  });
});