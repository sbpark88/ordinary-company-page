import { expect, test } from "@jest/globals";
import {
  dropLongString,
  startWithAlphabet,
  startWithNumber,
  startWithSpecialCharacter,
  stringContainsAlphabets,
  stringContainsLowerCases,
  stringContainsUpperCases,
  stringContainsNumbers,
  stringContainsSpecialCharacters,
  stringIsEmpty,
  stringLengthIsLessThanOrEqual,
  stringLengthIsGreaterThanOrEqual,
  stringOnlyContainsAlphabets,
  stringOnlyContainsAlphabetsAndNumbers,
} from "../../../modules/utils/StringUtils";

// dropLongString 함수의 테스트
test("Short strings are returned as origin.", () => {
  const origin = "Hello";
  const maxLength = 10;

  const result = dropLongString(origin, maxLength);
  expect(result).toBe(origin);
  expect(result.length).toBeLessThanOrEqual(maxLength);
});

test("Strings longer than 20 characters are shortened.", () => {
  const origin = "Hello, Mr. Jake.";
  const maxLength = 10;
  const expected = origin.slice(0, 10) + "...";

  const result = dropLongString(origin, maxLength);
  expect(result).not.toBe(origin);
  expect(result.length).toBeLessThanOrEqual(maxLength + 3);
  expect(result).toBe(expected);
});

// stringIsEmpty 함수의 테스트
test("String is empty.", () => {
  expect(stringIsEmpty(" ")).toBe(true);
});

test("String is non-empty.", () => {
  expect(stringIsEmpty("Hello")).toBe(false);
});

// startWith 함수의 테스트
test("String starts with alphabet", () => {
  const testString = "Hello, World!";
  expect(startWithAlphabet(testString)).toBe(true);
});

test("String does not start with alphabet - start with number", () => {
  const testString = "9Hello, World!";
  expect(startWithAlphabet(testString)).toBe(false);
});

test("String does not start with alphabet - start with special character", () => {
  const testString = "$Hello, World!";
  expect(startWithAlphabet(testString)).toBe(false);
});
test("String starts with number", () => {
  const testString = "1234 Hello";
  expect(startWithNumber(testString)).toBe(true);
});

test("String does not start with number - start with alphabet", () => {
  const testString = "A1234 Hello";
  expect(startWithNumber(testString)).toBe(false);
});

test("String does not start with number - start with special character", () => {
  const testString = "$1234 Hello";
  expect(startWithNumber(testString)).toBe(false);
});

test("String starts with special character", () => {
  const testString = "!@#$ Hello";
  expect(startWithSpecialCharacter(testString)).toBe(true);
});

test("String does not start with special character - start with alphabet", () => {
  const testString = "Hello";
  expect(startWithSpecialCharacter(testString)).toBe(false);
});

test("String does not start with special character - start with number", () => {
  const testString = "2Hello";
  expect(startWithSpecialCharacter(testString)).toBe(false);
});

test("String does not start with alphabet, number, or special character", () => {
  const testString = " World!";
  expect(startWithAlphabet(testString)).toBe(false);
  expect(startWithNumber(testString)).toBe(false);
  expect(startWithSpecialCharacter(testString)).toBe(false);
});

// stringIncludesAlphabets 함수의 테스트
test("String contains as least one alphabet", () => {
  const testString = "7*@4H24";
  expect(stringContainsAlphabets(testString)).toBe(true);
});

test("String does not contain any alphabet", () => {
  const testString = "7*@4824";
  expect(stringContainsAlphabets(testString)).toBe(false);
});

// stringContainsLowerCases 함수의 테스트
test("String contains at least one lowercase letter", () => {
  const testString = "7*@424g";
  expect(stringContainsLowerCases(testString)).toBe(true);
});

test("String does not contain any lowercase letter", () => {
  const testString = "7*@424G";
  expect(stringContainsLowerCases(testString)).toBe(false);
});

// stringContainsUpperCases 함수의 테스트
test("String contains at least one uppercase letter", () => {
  const testString = "7*@424G";
  expect(stringContainsUpperCases(testString)).toBe(true);
});

test("String does not contain any uppercase letter", () => {
  const testString = "7*@424g";
  expect(stringContainsUpperCases(testString)).toBe(false);
});

// stringContainsNumbers 함수의 테스트
test("String contains at least one number", () => {
  const testString = "7*@Hsd";
  expect(stringContainsNumbers(testString)).toBe(true);
});

test("String does not contain any number", () => {
  const testString = "*@Hsd";
  expect(stringContainsNumbers(testString)).toBe(false);
});

// stringContainsSpecialCharacters 함수의 테스트
test("String contains at least one special character", () => {
  const testString = "7Aa1^";
  expect(stringContainsSpecialCharacters(testString)).toBe(true);
});

test("String does not contain any special character", () => {
  const testString = "7Aa1";
  expect(stringContainsSpecialCharacters(testString)).toBe(false);
});

// stringOnlyContainsAlphabets 함수의 테스트
test("String only contains alphabets.", () => {
  const testString = "HelloWorld";
  expect(stringOnlyContainsAlphabets(testString)).toBe(true);
});

test("String does not only contains alphabets.", () => {
  const stringWithNumber = "HelloW0rld";
  const stringWithSpecialCharacter = "HelloWor!d";

  expect(stringOnlyContainsAlphabets(stringWithNumber)).toBe(false);
  expect(stringOnlyContainsAlphabets(stringWithSpecialCharacter)).toBe(false);
});

// stringOnlyContainsAlphabets 함수의 테스트
test("String only contains alphabets and numbers", () => {
  const onlyString = "HelloWorld";
  const onlyNumbers = "12308366";
  const onlyStringAndNumbers = "HelloW0r1d";

  expect(stringOnlyContainsAlphabetsAndNumbers(onlyString)).toBe(true);
  expect(stringOnlyContainsAlphabetsAndNumbers(onlyNumbers)).toBe(true);
  expect(stringOnlyContainsAlphabetsAndNumbers(onlyStringAndNumbers)).toBe(
    true
  );
});

test("String does not only contains alphabets and numbers", () => {
  const stringWithSpecialCharacter = "HelloWor!d";

  expect(
    stringOnlyContainsAlphabetsAndNumbers(stringWithSpecialCharacter)
  ).toBe(false);
});

// stringLengthIsLessThanOrEqual 함수의 테스트
test("String is shorter than or equal to 10 characters.", () => {
  const length = 10;

  const string8 = "abcde123";
  const string10 = "abcde12345";
  expect(stringLengthIsLessThanOrEqual(string8, length)).toBe(true);
  expect(stringLengthIsLessThanOrEqual(string10, length)).toBe(true);
});

test("String is not shorter than or equal to 10 characters.", () => {
  const length = 10;

  const string11 = "abcde12345F";
  expect(stringLengthIsLessThanOrEqual(string11, length)).toBe(false);
});

// stringLengthIsGreaterTHanOrEqual 함수의 테스트
test("String is longer than or equal to 10 characters.", () => {
  const length = 10;

  const string10 = "abcde12345";
  const string11 = "abcde12345F";
  expect(stringLengthIsGreaterThanOrEqual(string10, length)).toBe(true);
  expect(stringLengthIsGreaterThanOrEqual(string11, length)).toBe(true);
});

test("String is not longer than or equal to 10 characters.", () => {
  const length = 10;

  const string8 = "abcde123";
  expect(stringLengthIsGreaterThanOrEqual(string8, length)).toBe(false);
});
