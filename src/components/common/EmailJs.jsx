import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { emailjsApi } from "../../apiKey";
import { pipe } from "../../modules/utils/FunctionalProgramming";
import { stringIsEmpty } from "../../modules/utils/StringUtils";
import { toast } from "react-toastify";
import $K from "../../modules/data/Constants";
import { throttle } from "../../modules/utils/Performance";
import Input from "./Input";
import Textarea from "./Textarea";

function EmailJs({ sendEmailSuccess, sendEmailFail }) {
  const form = useRef();
  if (!isFunction(sendEmailSuccess) || !isFunction(sendEmailFail)) {
    console.error("EmailJs needs both a success callback and a fail callback.");
    return null;
  }
  const resetForm = () => form.current.reset();
  const successCallback = pipe(sendEmailSuccess, resetForm);
  const sendEmail = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (
      stringIsEmpty(formData.get("user_name")) ||
      stringIsEmpty(formData.get("message"))
    ) {
      toast.info("이름과 메시지를 입력해주세요.", $K.TOAST_POSITION);
      return null;
    }

    emailjs
      .sendForm(
        emailjsApi.serviceId,
        emailjsApi.templateId,
        form.current,
        emailjsApi.publicKey
      )
      .then(successCallback, sendEmailFail);
  };
  const throttledSendEmail = throttle(sendEmail, 3000);

  return (
    <form className="emailjs" ref={form} onSubmit={throttledSendEmail}>
      <Input label="Name" type="text" name="user_name" />
      <Input label="Email" type="email" name="user_name" />
      <Textarea
        label="Message"
        name="message"
        sibling={<input type="submit" value="Send" />}
      />
    </form>
  );
}

export default EmailJs;

const isFunction = (fn) => fn instanceof Function;
