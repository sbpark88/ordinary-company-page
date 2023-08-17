import { describe, expect, test } from "@jest/globals";

const randomSort = () => Math.random() - 0.5;

describe("Random sort test", () => {
  test("Random sort return -0.5 <= x < 0.5", () => {
    let result = true;
    for (let i = 0; i < 1000000; i++) {
      let number = randomSort();
      if (number < -0.5 || number >= 0.5) {
        result = false;
        break;
      }
    }
    expect(result).toBe(true);
  });
});

const isEmptyArray = (arr) => arr instanceof Array && arr.length === 0;

describe("Empty array test return boolean result.", () => {
  describe("Non-array instances will be return false.", () => {
    test("Number will be return false.", () => {
      const someNumber = 0;
      expect(isEmptyArray(someNumber)).toBe(false);
    });

    test("String will be return false.", () => {
      const someString = "";
      expect(isEmptyArray(someString)).toBe(false);
    });

    test("Object will be return false.", () => {
      const someObject = {};
      expect(isEmptyArray(someObject)).toBe(false);
    });
  });

  describe("Array instances will be return true or false.", () => {
    test("Empty array instances will be return true.", () => {
      const emptyArray = [];
      expect(isEmptyArray(emptyArray)).toBe(true);
    });

    test("Non-empty array instances will be return false.", () => {
      const nonEmptyArray = [1, 2];
      expect(isEmptyArray(nonEmptyArray)).toBe(false);
    });
  });
});
