import $K from "../data/Constants";

export const dropLongString = (str, length) => {
  if ("string" !== typeof str) return;
  return str.length > length ? str.slice(0, length) + "..." : str;
};

export const stringIsEmpty = (str) => str.trim() === "";

const startWith = (regExp) => (str) => regExp.test(str[0]);

export const startWithAlphabet = startWith($K.REG_EXP.ALPHABETS);
export const startWithNumber = startWith($K.REG_EXP.NUMBERS);

export const startWithSpecialCharacter = startWith(
  $K.REG_EXP.SPECIAL_CHARACTERS
);

const stringContains = (regExp) => (str) => regExp.test(str);
export const stringContainsAlphabets = stringContains($K.REG_EXP.ALPHABETS);

export const stringContainsLowerCases = stringContains($K.REG_EXP.LOWER_CASE);

export const stringContainsUpperCases = stringContains($K.REG_EXP.UPPER_CASE);
export const stringContainsNumbers = stringContains($K.REG_EXP.NUMBERS);

export const stringContainsSpecialCharacters = stringContains(
  $K.REG_EXP.SPECIAL_CHARACTERS
);

export const stringOnlyContainsAlphabets = stringContains(
  $K.REG_EXP.ONLY_STRING
);

export const stringOnlyContainsAlphabetsAndNumbers = stringContains(
  $K.REG_EXP.ONLY_STRING_AND_NUMBER
);

export const stringContainsValidEmail = stringContains($K.REG_EXP.E_MAIL);

export const stringLengthIsLessThanOrEqual = (str, length) =>
  str.length <= length;
export const stringLengthIsGreaterThanOrEqual = (str, length) =>
  str.length >= length;

// 2023-07-09T00:22:29Z 형식을 받아 2023.07.09 로 반환
export const convertTimeIso8601toKoreanYearMonthDay = (iso8601) =>
  iso8601.split("T")[0].replaceAll("-", ".");

export const objectToUrlParams = (obj) => {
  return Object.entries(obj)
    .filter(validParams)
    .reduce((acc, [key, value]) => {
      acc.append(key, String(value));
      return acc;
    }, new URLSearchParams())
    .toString();

  function validParams([key, value]) {
    if ("number" === typeof value) return !isNaN(value);
    else if (value === undefined || value === null || value instanceof Object)
      return false;
    else return String(value).trim().length > 0;
  }
};
