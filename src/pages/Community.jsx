import React, { useCallback, useState } from "react";
import Layout from "../components/layout/Layout";
import $K from "../modules/data/Constants";
import { Input } from "../components/common/Input";
import Textarea from "../components/common/Textarea";
import useInputs from "../hooks/UseInputs";

function Community(props) {
  const [{ title, comment }, changeGuestBook, resetGuestBook] = useInputs(
    initialGuestBookState
  );
  const createGuestBook = useCallback(
    (event) => {
      console.log({ title: title, comment: comment });
      resetGuestBook();
    },
    [title, comment, resetGuestBook]
  );

  return (
    <Layout
      name={"Community"}
      backgroundImageUrl={`${$K.PUBLIC_URL}/img/Community.jpg`}
    >
      <div className="inputBox">
        <Input
          type="text"
          name="title"
          placeholder="제목을 입력하세요."
          data={title}
          setData={changeGuestBook}
        />
        <Textarea
          name="comment"
          size={{ cols: 30, rows: 10 }}
          placeholder="본문을 입력하세요."
          data={comment}
          setData={changeGuestBook}
        />
        <nav className="btnSet">
          <button onClick={resetGuestBook}>Cancel</button>
          <button onClick={createGuestBook}>Write</button>
        </nav>
      </div>
    </Layout>
  );
}

export default Community;

const initialGuestBookState = {
  title: "",
  comment: "",
};
