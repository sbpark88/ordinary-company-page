import {
  startWithAlphabet,
  stringContainsAlphabets,
  stringContainsLowerCases,
  stringContainsNumbers,
  stringContainsSpecialCharacters,
  stringContainsUpperCases,
  stringOnlyContainsAlphabetsAndNumbers,
  stringLengthIsGreaterThanOrEqual,
  stringContainsValidEmail,
} from "./StringUtils";
import ValidatorMonad from "../common/ValidatorMonad";

/**
 * 사용자 아이디기 5자리 이상이면서 영문자로 시작해야한다.
 * 사용자 아이디는 영문자로만 구성되거나 영문 + 숫자로만 구성되어야한다.
 *
 * @param str
 * @returns {ValidatorMonad|(function(): ValidatorMonad)}
 */
export const testUserId = (str) =>
  ValidatorMonad.of(str)
    .map(startWithAlphabet)
    .map(stringOnlyContainsAlphabetsAndNumbers)
    .map((str) => stringLengthIsGreaterThanOrEqual(str, 5))
    .close(
      "사용자 아이디는 영문으로 시작하는 영문 또는 숫자를 5자리 이상 입력해주세요."
    );

const isSafePassword =
  (...regExpTestFns) =>
  (str) =>
    regExpTestFns.every((regExpTestFn) => regExpTestFn(str));

/**
 * 사용자 Password 의 유효성을 검증한다.
 * 영문자 + 숫자 + 특수문자가 하나 이상 포함되어야 true
 *
 * @type {function(*): this is *[]}
 */
const isSafePasswordMiddle = isSafePassword(
  stringContainsAlphabets,
  stringContainsNumbers,
  stringContainsSpecialCharacters
);

/**
 * 사용자 Password 의 유효성을 검증한다.
 * 영문 소문자 + 영문 대문자 = 숫자 + 특수문자가 하나 이상 포함되어야 true
 *
 * @type {function(*): this is *[]}
 */
const isSafePasswordHard = isSafePassword(
  stringContainsLowerCases,
  stringContainsUpperCases,
  stringContainsNumbers,
  stringContainsSpecialCharacters
);

/**
 * 비밀번호가 8자리 이상이면서 영문, 숫자, 특수문자를 모두 포함하는지 테스트.
 *
 * @param str
 * @returns {ValidatorMonad}
 */
export const testPassword = (str) =>
  ValidatorMonad.of(str)
    .map((str) => stringLengthIsGreaterThanOrEqual(str, 8))
    .map(isSafePasswordMiddle)
    .close("영문, 숫자, 특수문자를 모두 포함해 8자리 이상 입력해주세요.");

/**
 * 이메일 주소의 유효성을 검증하는 테스트
 *
 * @param str
 * @returns {ValidatorMonad|(function(): ValidatorMonad)}
 */
export const testEmail = (str) =>
  ValidatorMonad.of(str)
    .map(stringContainsValidEmail)
    .close("유효한 이메일 주소를 입력해주세요.");

/**
 * 찾으려는 목록이 유효한 목록을 하나 이상 포함하는지 검증하는 테스트
 *
 * @param validList
 * @param retrieving
 * @param errorMessage
 * @returns {*}
 */

export const testSelectAtLeastOne = (validList, retrieving, errorMessage) => {
  const $retrievingList =
    retrieving instanceof Array ? retrieving : [retrieving];
  return ValidatorMonad.of($retrievingList)
    .map(() =>
      $retrievingList.some((retrieving) => validList.includes(retrieving))
    )
    .close(errorMessage);
};
