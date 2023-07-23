import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { emailjsApi } from "../../apiKey";

function EmailJs({ sendEmailSuccess, sendEmailFail }) {
  const form = useRef();
  if (!isFunction(sendEmailSuccess) || !isFunction(sendEmailFail)) {
    console.error("EmailJs needs both a success callback and a fail callback.");
    return null;
  }
  const sendEmail = (event) => {
    event.preventDefault();
    emailjs
      .sendForm(
        emailjsApi.serviceId,
        emailjsApi.templateId,
        form.current,
        emailjsApi.publicKey
      )
      .then(sendEmailSuccess, sendEmailFail);
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
}

export default EmailJs;

const isFunction = (fn) => fn instanceof Function;
