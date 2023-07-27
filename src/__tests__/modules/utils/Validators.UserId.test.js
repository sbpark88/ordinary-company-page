import { test, expect } from "@jest/globals";
import {
  startWithAlphabet,
  stringOnlyContainsAlphabetsAndNumbers,
  strLengthIsGreaterThanOrEqual,
} from "../../../modules/utils/StringUtils";
import ValidatorMonad from "../../../modules/common/ValidatorMonad";

/**
 * 사용자 아이디기 5자리 이상이면서 영문자로 시작해야한다.
 * 사용자 아이디는 영문자로만 구성되거나 영문 + 숫자로만 구성되어야한다.
 *
 * @param str
 * @returns {ValidatorMonad|(function(): ValidatorMonad)}
 */
const testUserId = (str) =>
  ValidatorMonad.of(str)
    .map(startWithAlphabet)
    .map(stringOnlyContainsAlphabetsAndNumbers)
    .map((str) => strLengthIsGreaterThanOrEqual(str, 5))
    .close(
      "사용자 아이디는 영문으로 시작하는 영문 또는 숫자를 5자리 이상 입력해주세요."
    );

test("UserId only contains alphabets is valid.", () => {
  const validUserId = "afzFsbf";

  const validation = testUserId(validUserId);
  expect(validation.status).toBe(true);
});

test("UserId only contains alphabets and numbers is valid.", () => {
  const validUserId = "abfj83vF";

  const validation = testUserId(validUserId);
  expect(validation.status).toBe(true);
});

test("UserId contains special characters.", () => {
  const invalidUserId = "ab3f#ob";

  const validation = testUserId(invalidUserId);
  expect(validation.status).toBe(false);
  expect(validation.errorMessage).toBe(
    "사용자 아이디는 영문으로 시작하는 영문 또는 숫자를 5자리 이상 입력해주세요."
  );
});

test("UserId is too short.", () => {
  const invalidUserId = "ab3f";

  const validation = testUserId(invalidUserId);
  expect(validation.status).toBe(false);
  expect(validation.errorMessage).toBe(
    "사용자 아이디는 영문으로 시작하는 영문 또는 숫자를 5자리 이상 입력해주세요."
  );
});
