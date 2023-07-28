import { toast } from "react-toastify";

/**
 *
 * PASSWORD_RULE_MIDDLE : 영문 + 숫자 + 특수문자
 * PASSWORD_RULE_HARD : 영문 소문자 + 영문 대문자 + 숫자 + 특수문자
 */
const Constants = {
  PUBLIC_URL: process.env.PUBLIC_URL,
  TOAST_POSITION: {
    position: toast.POSITION.BOTTOM_CENTER,
  },
  REG_EXP: {
    ALPHABETS: /[a-zA-Z]/,
    LOWER_CASE: /[a-z]/,
    UPPER_CASE: /[A-Z]/,
    NUMBERS: /\d/,
    SPECIAL_CHARACTERS: /[!@#$%^&*()_+]/,
    ONLY_STRING: /^[a-zA-Z]+$/,
    ONLY_STRING_AND_NUMBER: /^[a-zA-Z0-9]+$/,
    E_MAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
};

export default Constants;
