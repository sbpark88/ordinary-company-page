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

export const strLengthIsLessThanOrEqual = (str, length) => str.length <= length;
export const strLengthIsGreaterThanOrEqual = (str, length) =>
  str.length >= length;
