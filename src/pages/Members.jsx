import React, { useCallback, useState } from "react";
import Layout from "../components/layout/Layout";
import $K from "../modules/data/Constants";
import InputText from "../components/form/InputText";
import InputPassword from "../components/form/InputPassword";
import InputRadio from "../components/form/InputRadio";
import InputCheckbox from "../components/form/InputCheckbox";
import Select from "../components/form/Select";
import Textarea from "../components/form/Textarea";
import { toast } from "react-toastify";
import { throttle } from "../modules/utils/Performance";
import {
  testEmail,
  testPassword,
  testSelectAtLeastOne,
  testUserId,
} from "../modules/utils/Validators";
import ValidatorMonad from "../modules/common/ValidatorMonad";
import { stringLengthIsGreaterThanOrEqual } from "../modules/utils/StringUtils";

function Members(props) {
  const [registerForm, setRegisterForm] = useState(initialRegisterFormState);

  const setProperty = (property) => (value) =>
    setRegisterForm({ ...registerForm, [property]: value });

  const [errorMessage, setErrorMessage] = useState(initialErrorMessageState);

  const testValidation = useCallback(() => {
    let $errorMessage = { ...initialErrorMessageState };

    // User Id
    const userIdValidatorMonad = testUserId(registerForm.userId);
    $errorMessage = collectErrorMessage(
      $errorMessage,
      "userId",
      userIdValidatorMonad
    );

    // Password
    const samePassword = registerForm.password === registerForm.rePassword;
    const passwordValidatorMonad = samePassword
      ? testPassword(registerForm.password)
      : ValidatorMonad.invalid.close("비밀번호가 다릅니다.");
    $errorMessage = collectErrorMessage(
      $errorMessage,
      samePassword ? "password" : "rePassword",
      passwordValidatorMonad
    );

    // Email
    const emailValidatorMonad = testEmail(registerForm.email);
    $errorMessage = collectErrorMessage(
      $errorMessage,
      "email",
      emailValidatorMonad
    );

    // Gender
    const genderValidatorMonad = testSelectAtLeastOne(
      genderProperties,
      registerForm.gender,
      "성별을 선택해주세요."
    );
    $errorMessage = collectErrorMessage(
      $errorMessage,
      "gender",
      genderValidatorMonad
    );

    // Interest
    const interestValidatorMonad = testSelectAtLeastOne(
      interestProperties,
      registerForm.interest,
      "관심사를 하나 이상 선택해주세요."
    );
    $errorMessage = collectErrorMessage(
      $errorMessage,
      "interest",
      interestValidatorMonad
    );

    // Education
    const educationValidatorMonad = testSelectAtLeastOne(
      educationPropertiesWithName
        .flatMap((tuple) => tuple[0])
        .filter((value) => value !== ""),
      registerForm.education,
      "최종 학력을 선택해주세요."
    );
    $errorMessage = collectErrorMessage(
      $errorMessage,
      "education",
      educationValidatorMonad
    );

    // Comment_
    const commentValidatorMonad = stringLengthIsGreaterThanOrEqual(
      registerForm.comment,
      10
    )
      ? ValidatorMonad.valid(registerForm.comment)
      : ValidatorMonad.invalid.close("코멘트를 10자 이상 입력해주세요.");
    $errorMessage = collectErrorMessage(
      $errorMessage,
      "comment",
      commentValidatorMonad
    );

    // Update error message and return
    setErrorMessage($errorMessage);

    return [
      userIdValidatorMonad,
      passwordValidatorMonad,
      emailValidatorMonad,
      genderValidatorMonad,
      interestValidatorMonad,
      educationValidatorMonad,
      commentValidatorMonad,
    ].every((monad) => monad.status);
  }, [registerForm]);

  const handleReset = () => {
    setRegisterForm(initialRegisterFormState);
    setErrorMessage(initialErrorMessageState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (testValidation()) {
      if (Math.random() <= 1) {
        sendRegisterFormSuccess();
        handleReset();
      } else {
        sendRegisterFormFail();
      }
    }
  };
  const throttledHandleSubmit = throttle(handleSubmit, 3000);

  return (
    <Layout
      name={"Member"}
      backgroundImageUrl={`${$K.PUBLIC_URL}/img/Members.jpg`}
    >
      <form>
        <fieldset>
          <legend hidden>회원등록 폼 양식</legend>
          <table>
            <tbody>
              <InputText
                label="USER ID"
                name="userId"
                data={registerForm.userId}
                setData={setProperty("userId")}
                placeholder="아이디를 입력하세요."
                errorMessage={errorMessage.userId}
              />
              <InputPassword
                label="PASSWORD"
                name="password"
                data={registerForm.password}
                setData={setProperty("password")}
                placeholder="비밀번호를 입력하세요."
                errorMessage={errorMessage.password}
              />
              <InputPassword
                label="RE-PASSWORD"
                name="rePassword"
                data={registerForm.rePassword}
                setData={setProperty("rePassword")}
                placeholder="비밀번호를 다시 입력하세요."
                errorMessage={errorMessage.rePassword}
              />
              <InputText
                label="EMAIL"
                name="email"
                data={registerForm.email}
                setData={setProperty("email")}
                placeholder="이메일 주소를 입력하세요."
                errorMessage={errorMessage.email}
              />
              <InputRadio
                label="GENDER"
                name="gender"
                data={registerForm.gender}
                setData={setProperty("gender")}
                properties={genderProperties}
                errorMessage={errorMessage.gender}
              />
              <InputCheckbox
                label="INTEREST"
                data={registerForm.interest}
                name="interest"
                setData={setProperty("interest")}
                properties={interestProperties}
                errorMessage={errorMessage.interest}
              />
              <Select
                label="EDUCATION"
                name="education"
                data={registerForm.education}
                setData={setProperty("education")}
                propertiesWithName={educationPropertiesWithName}
                errorMessage={errorMessage.education}
              />
              <Textarea
                label="comment"
                name="comment"
                data={registerForm.comment}
                setData={setProperty("comment")}
                size={commentTextareaSize}
                placeholder="남기고 싶은 내용을 적어주세요."
                errorMessage={errorMessage.comment}
              />
              <tr>
                <th colSpan="2">
                  <button
                    type="reset"
                    className="custom-button-red"
                    children="Reset"
                    onClick={handleReset}
                  />
                  <button
                    type="button"
                    className="custom-button-green"
                    children="Register"
                    onClick={throttledHandleSubmit}
                  />
                </th>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </form>
    </Layout>
  );
}

export default Members;

const initialRegisterFormState = {
  userId: "",
  password: "",
  rePassword: "",
  email: "",
  gender: "",
  interest: [],
  education: "",
  comment: "",
};
const initialErrorMessageState = {
  userId: "",
  password: "",
  rePassword: "",
  email: "",
  gender: "",
  interest: "",
  education: "",
  comment: "",
};
const genderProperties = ["male", "female"];
const interestProperties = ["sports", "music", "game"];
const educationPropertiesWithName = [
  ["", "최종학력을 선택하세요."],
  ["elementary-school", "초등학교 졸업"],
  ["middle-school", "중학교 졸업"],
  ["high-school", "고등학교 졸업"],
  ["university", "대학교 졸업"],
];
const commentTextareaSize = {
  cols: 30,
  rows: 3,
};

const sendRegisterFormSuccess = () =>
  toast.success("회원 등록을 축하드립니다!", $K.TOAST_POSITION);
const sendRegisterFormFail = () =>
  toast.error("회원 등록에 실패했습니다.", $K.TOAST_POSITION);

const collectErrorMessage = ($errorMessage, property, validatorMonad) => {
  if (validatorMonad.status) {
    return {
      ...$errorMessage,
      [property]: "",
    };
  } else {
    return {
      ...$errorMessage,
      [property]: validatorMonad.errorMessage,
    };
  }
};
