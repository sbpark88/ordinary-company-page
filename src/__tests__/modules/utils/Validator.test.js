import { test, expect, describe } from "@jest/globals";
import {
  startWithAlphabet,
  stringOnlyContainsAlphabetsAndNumbers,
  stringLengthIsGreaterThanOrEqual,
  stringContainsAlphabets,
  stringContainsNumbers,
  stringContainsSpecialCharacters,
  stringContainsLowerCases,
  stringContainsUpperCases,
  stringContainsValidEmail,
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
    .map((str) => stringLengthIsGreaterThanOrEqual(str, 5))
    .close(
      "사용자 아이디는 영문으로 시작하는 영문 또는 숫자를 5자리 이상 입력해주세요."
    );

describe("UserId validation test", () => {
  const errorMessage =
    "사용자 아이디는 영문으로 시작하는 영문 또는 숫자를 5자리 이상 입력해주세요.";

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
    expect(validation.errorMessage).toBe(errorMessage);
  });

  test("UserId is too short.", () => {
    const invalidUserId = "ab3f";

    const validation = testUserId(invalidUserId);
    expect(validation.status).toBe(false);
    expect(validation.errorMessage).toBe(errorMessage);
  });
});

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

describe("Safe password level middle validation test", () => {
  test("Password contains at least one alphabet, one number, and one special character", () => {
    const validPassword = "p@ssw0rd";
    expect(isSafePasswordMiddle(validPassword)).toBe(true);
  });

  test("Password does not contain at least one alphabet, one number, and one special character", () => {
    const invalidPassword1 = "3898##!2"; // No alphabet
    const invalidPassword2 = "Password"; // No number
    const invalidPassword3 = "Passw0rd"; // No special character

    expect(isSafePasswordMiddle(invalidPassword1)).toBe(false);
    expect(isSafePasswordMiddle(invalidPassword2)).toBe(false);
    expect(isSafePasswordMiddle(invalidPassword3)).toBe(false);
  });

  test("Password is undefined or null.", () => {
    const invalidPassword1 = undefined;
    const invalidPassword2 = null;

    expect(isSafePasswordMiddle(invalidPassword1)).toBe(false);
    expect(isSafePasswordMiddle(invalidPassword2)).toBe(false);
  });
});

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

describe("Safe password level hard validation test", () => {
  test("Password contains at least one lowercase alphabet, one uppercase alphabet, one number, and one special character", () => {
    const validPassword = "p@ssW0rd";
    expect(isSafePasswordHard(validPassword)).toBe(true);
  });

  test("Password does not contain at least one lowercase alphabet, one uppercase alphabet, one number, and one special character", () => {
    const invalidPassword1 = "P@SSW0RD"; // No lowercase alphabet
    const invalidPassword2 = "p@ssw0rd"; // No uppercase alphabet
    const invalidPassword3 = "P@SSWord"; // No number
    const invalidPassword4 = "PaSsW0rd"; // No special character

    expect(isSafePasswordHard(invalidPassword1)).toBe(false);
    expect(isSafePasswordHard(invalidPassword2)).toBe(false);
    expect(isSafePasswordHard(invalidPassword4)).toBe(false);
    expect(isSafePasswordHard(invalidPassword3)).toBe(false);
  });
});

/**
 * 비밀번호가 8자리 이상이면서 영문, 숫자, 특수문자를 모두 포함하는지 테스트.
 *
 * @param str
 * @returns {ValidatorMonad}
 */
const testPassword = (str) =>
  ValidatorMonad.of(str)
    .map((str) => stringLengthIsGreaterThanOrEqual(str, 8))
    .map(isSafePasswordMiddle)
    .close("영문, 숫자, 특수문자를 모두 포함해 8자리 이상 입력해주세요.");

describe("Password validation test", () => {
  const errorMessage =
    "영문, 숫자, 특수문자를 모두 포함해 8자리 이상 입력해주세요.";

  test("Password is long enough and safe.", () => {
    const validPassword = "p@ssw0rd";

    const validation = testPassword(validPassword);
    expect(validation.status).toBe(true);
  });

  test("Password is long but not safe.", () => {
    const invalidPassword = "pass0rd39pass";

    const validation = testPassword(invalidPassword);
    expect(validation.status).toBe(false);
    expect(validation.errorMessage).toBe(errorMessage);
  });

  test("Password is not long", () => {
    const invalidPassword = "";

    const validation = testPassword(invalidPassword);
    expect(validation.status).toBe(false);
    expect(validation.errorMessage).toBe(errorMessage);
  });
});

/**
 * 이메일 주소의 유효성을 검증하는 테스트
 *
 * @param str
 * @returns {ValidatorMonad|(function(): ValidatorMonad)}
 */
const testEmail = (str) =>
  ValidatorMonad.of(str)
    .map(stringContainsValidEmail)
    .close("유효한 이메일 주소를 입력해주세요.");

describe("Email validation test", () => {
  const errorMessage = "유효한 이메일 주소를 입력해주세요.";

  test("Valid email addresses", () => {
    const validEmail1 = "test@example.com";
    const validEmail2 = "john.doe+test@gmail.com";
    const validEmail3 = "info@sub.domain.co.uk";

    const validation1 = testEmail(validEmail1);
    const validation2 = testEmail(validEmail2);
    const validation3 = testEmail(validEmail3);

    expect(validation1.status).toBe(true);
    expect(validation2.status).toBe(true);
    expect(validation3.status).toBe(true);
  });

  test("Invalid email addresses - no @", () => {
    const invalidEmail = "invalid.com";

    const validation = testEmail(invalidEmail);

    expect(validation.status).toBe(false);
    expect(validation.errorMessage).toBe(errorMessage);
  });

  test("Invalid email addresses - no domain", () => {
    const invalidEmail = "invalid.email@";

    const validation = testEmail(invalidEmail);

    expect(validation.status).toBe(false);
    expect(validation.errorMessage).toBe(errorMessage);
  });

  test("Invalid email addresses - no local", () => {
    const invalidEmail = "@invalid.com";

    const validation = testEmail(invalidEmail);

    expect(validation.status).toBe(false);
    expect(validation.errorMessage).toBe(errorMessage);
  });
});

/**
 * 유효한 목록에 포함된 항목인지 검증하는 테스트
 *
 * @param validList
 * @param retrieving
 * @param errorMessage
 * @returns {*}
 */
const testSelectAtLeastOne = (validList, retrieving, errorMessage) =>
  ValidatorMonad.of(retrieving)
    .map(() => validList.some((element) => element === retrieving))
    .close(errorMessage);

describe("Valid retrieving target test", () => {
  const validList = [
    "마카다미아",
    "피스타치오",
    "아몬드",
    "캐슈넛",
    "브라질넛",
  ];
  const errorMessage = "견과류를 하나 이상 선택해주세요.";

  test("아몬드 is valid element of 'validList'.", () => {
    const retrieving = "아몬드";

    const validation = testSelectAtLeastOne(
      validList,
      retrieving,
      errorMessage
    );
    expect(validation.status).toBe(true);
  });

  test("호두 is invalid element of 'validList'.", () => {
    const retrieving = "호두";

    const validation = testSelectAtLeastOne(
      validList,
      retrieving,
      errorMessage
    );
    expect(validation.status).toBe(false);
    expect(validation.errorMessage).toBe(errorMessage);
  });

  test("호두 is invalid element of 'validList'.", () => {
    const retrieving = "호두";

    const validation = testSelectAtLeastOne(
      validList,
      retrieving,
      errorMessage
    );
    expect(validation.status).toBe(false);
    expect(validation.errorMessage).toBe(errorMessage);
  });
});
