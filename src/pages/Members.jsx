import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import Constants from "../modules/data/Constants";
import InputText from "../components/form/InputText";
import InputRadio from "../components/form/InputRadio";
import InputCheckbox from "../components/form/InputCheckbox";
import Select from "../components/form/Select";
import Textarea from "../components/form/Textarea";
import { toast } from "react-toastify";
import { throttle } from "../modules/utils/Performance";

function Members(props) {
  const [registerForm, setRegisterForm] = useState(initialRegisterFormState);

  const setProperty = (property) => (value) =>
    setRegisterForm({ ...registerForm, [property]: value });

  const [errorMessage, setErrorMessage] = useState({
    userId: "",
    password: "",
    rePassword: "",
    email: "",
    gender: "",
    interest: "",
    education: "",
    comment: "",
  });

  const handleReset = (event) => setRegisterForm(initialRegisterFormState);

  const handleSubmit = (event) => {
    event.preventDefault();
    sendRegisterFormSuccess();
    handleReset();
  };
  const throttledHandleSubmit = throttle(handleSubmit, 3000);

  return (
    <Layout
      name={"Member"}
      backgroundImageUrl={`${Constants.PUBLIC_URL}/img/Members.jpg`}
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
              <InputText
                label="PASSWORD"
                name="password"
                data={registerForm.password}
                setData={setProperty("password")}
                placeholder="비밀번호를 입력하세요."
                errorMessage={errorMessage.password}
              />
              <InputText
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
  toast.success("회원 등록을 축하드립니다!", Constants.TOAST_POSITION);
const sendRegisterFormFail = () =>
  toast.error("회원 등록에 실패했습니다.", Constants.TOAST_POSITION);
