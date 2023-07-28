import { test, expect, describe } from "@jest/globals";
import { stringContainsValidEmail } from "../../../modules/utils/StringUtils";
import ValidatorMonad from "../../../modules/common/ValidatorMonad";
// "유효한 이메일 주소를 입력해주세요."

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

describe("Email Validation", () => {
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
    const errorMessage = "유효한 이메일 주소를 입력해주세요.";

    const validation = testEmail(invalidEmail);

    expect(validation.status).toBe(false);
    expect(validation.errorMessage).toBe(errorMessage);
  });

  test("Invalid email addresses - no domain", () => {
    const invalidEmail = "invalid.email@";
    const errorMessage = "유효한 이메일 주소를 입력해주세요.";

    const validation = testEmail(invalidEmail);

    expect(validation.status).toBe(false);
    expect(validation.errorMessage).toBe(errorMessage);
  });

  test("Invalid email addresses - no local", () => {
    const invalidEmail = "@invalid.com";
    const errorMessage = "유효한 이메일 주소를 입력해주세요.";

    const validation = testEmail(invalidEmail);

    expect(validation.status).toBe(false);
    expect(validation.errorMessage).toBe(errorMessage);
  });
});
