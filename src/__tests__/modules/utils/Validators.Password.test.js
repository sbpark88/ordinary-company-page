import { test, expect } from "@jest/globals";
import {
  stringContainsAlphabets,
  stringContainsLowerCases,
  stringContainsNumbers,
  stringContainsSpecialCharacters,
  stringContainsUpperCases,
  strLengthIsGreaterThanOrEqual,
} from "../../../modules/utils/StringUtils";
import ValidatorMonad from "../../../modules/common/ValidatorMonad";

const safePassword =
  (...regExpTestFns) =>
  (str) =>
    regExpTestFns.every((regExpTestFn) => regExpTestFn(str));

/**
 * 사용자 Password 의 유효성을 검증한다.
 * 영문자 + 숫자 + 특수문자가 하나 이상 포함되어야 true
 *
 * @type {function(*): this is *[]}
 */
const safePasswordMiddle = safePassword(
  stringContainsAlphabets,
  stringContainsNumbers,
  stringContainsSpecialCharacters
);

test("Password contains at least one alphabet, one number, and one special character", () => {
  const validPassword = "p@ssw0rd";
  expect(safePasswordMiddle(validPassword)).toBe(true);
});

test("Password does not contain at least one alphabet, one number, and one special character", () => {
  const invalidPassword1 = "3898##!2"; // No alphabet
  const invalidPassword2 = "Password"; // No number
  const invalidPassword3 = "Passw0rd"; // No special character

  expect(safePasswordMiddle(invalidPassword1)).toBe(false);
  expect(safePasswordMiddle(invalidPassword2)).toBe(false);
  expect(safePasswordMiddle(invalidPassword3)).toBe(false);
});

test("Password is undefined or null.", () => {
  const invalidPassword1 = undefined;
  const invalidPassword2 = null;

  expect(safePasswordMiddle(invalidPassword1)).toBe(false);
  expect(safePasswordMiddle(invalidPassword2)).toBe(false);
});

/**
 * 사용자 Password 의 유효성을 검증한다.
 * 영문 소문자 + 영문 대문자 = 숫자 + 특수문자가 하나 이상 포함되어야 true
 *
 * @type {function(*): this is *[]}
 */
const safePasswordHard = safePassword(
  stringContainsLowerCases,
  stringContainsUpperCases,
  stringContainsNumbers,
  stringContainsSpecialCharacters
);

test("Password contains at least one lowercase alphabet, one uppercase alphabet, one number, and one special character", () => {
  const validPassword = "p@ssW0rd";
  expect(safePasswordHard(validPassword)).toBe(true);
});

test("Password does not contain at least one lowercase alphabet, one uppercase alphabet, one number, and one special character", () => {
  const invalidPassword1 = "P@SSW0RD"; // No lowercase alphabet
  const invalidPassword2 = "p@ssw0rd"; // No uppercase alphabet
  const invalidPassword3 = "P@SSWord"; // No number
  const invalidPassword4 = "PaSsW0rd"; // No special character

  expect(safePasswordHard(invalidPassword1)).toBe(false);
  expect(safePasswordHard(invalidPassword2)).toBe(false);
  expect(safePasswordHard(invalidPassword4)).toBe(false);
  expect(safePasswordHard(invalidPassword3)).toBe(false);
});

/**
 * 비밀번호가 8자리 이상이면서 영문, 숫자, 특수문자를 모두 포함하는지 테스트.
 *
 * @param str
 * @returns {ValidatorMonad}
 */
const testPassword = (str) =>
  ValidatorMonad.of(str)
    .map((str) => strLengthIsGreaterThanOrEqual(str, 8))
    .map(safePasswordMiddle)
    .close("영문, 숫자, 특수문자를 모두 포함해 8자리 이상 입력해주세요.");

test("Password is long enough and safe.", () => {
  const validPassword = "p@ssw0rd";

  const validation = testPassword(validPassword);
  expect(validation.status).toBe(true);
});

test("Password is long but not safe.", () => {
  const invalidPassword = "pass0rd39pass";

  const validation = testPassword(invalidPassword);
  expect(validation.status).toBe(false);
  expect(validation.errorMessage).toBe(
    "영문, 숫자, 특수문자를 모두 포함해 8자리 이상 입력해주세요."
  );
});

test("Password is not long", () => {
  const invalidPassword = "";

  const validation = testPassword(invalidPassword);
  expect(validation.status).toBe(false);
  expect(validation.errorMessage).toBe(
    "영문, 숫자, 특수문자를 모두 포함해 8자리 이상 입력해주세요."
  );
});
