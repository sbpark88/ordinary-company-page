import React, { memo, useCallback, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import $K from "../modules/data/Constants";
import { Input } from "../components/common/Input";
import Textarea from "../components/common/Textarea";
import useInputs from "../hooks/UseInputs";
import CommunityDTO from "../modules/api/models/CommunityDTO";
import {
  deleteCommunity,
  getCommunity,
  postCommunity,
  putCommunity,
} from "../modules/api/Community";
import { stringIsEmpty } from "../modules/utils/StringUtils";
import { throttle } from "../modules/utils/Performance";
import { Toast } from "../modules/utils/UiHelper";

function Community(props) {
  const [{ title, comment }, changeCommunity, resetCommunity] = useInputs(
    initialGuestBookState
  );
  const [communities, setCommunities] = useState([]);
  const [editModeId, setEditModeId] = useState();

  const loadCommunity = useCallback(async () => {
    const response = await getCommunity();
    setCommunities(response.data);
  }, []);

  const createCommunity = useCallback(
    async (event) => {
      if (stringIsEmpty(title) || stringIsEmpty(comment)) {
        Toast.info("제목과 본문을 입력해주세요.");
        return null;
      }
      const requestDTO = new CommunityDTO({ title, comment });
      const response = await postCommunity(requestDTO);
      resetCommunity();
      await loadCommunity();
    },
    [title, comment, resetCommunity]
  );
  const throttledCreateCommunity = throttle(createCommunity, 3000);

  const updateCommunity = useCallback(async ({ id, title, comment }) => {
    const requestDTO = new CommunityDTO({ id, title, comment });
    const response = await putCommunity(requestDTO);
    setEditModeId(undefined);
    await loadCommunity();
  });

  const removeCommunity = useCallback(async (id) => {
    const response = await deleteCommunity(id);
    await loadCommunity();
  });

  const DisplayCommunity = PostDisplayMode(setEditModeId, removeCommunity);
  const EditCommunity = PostEditMode(setEditModeId, updateCommunity);

  useEffect(async () => {
    await loadCommunity();
  }, []);

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
          setData={changeCommunity}
        />
        <Textarea
          name="comment"
          size={{ cols: 30, rows: 10 }}
          placeholder="본문을 입력하세요."
          data={comment}
          setData={changeCommunity}
        />
        <nav className="btnSet">
          <button onClick={resetCommunity}>Reset</button>
          <button onClick={throttledCreateCommunity}>Write</button>
        </nav>
      </div>
      <div className="showBox">
        {communities?.map((community) =>
          community.id === editModeId ? (
            <EditCommunity key={community.id} {...community} />
          ) : (
            <DisplayCommunity key={community.id} {...community} />
          )
        )}
      </div>
    </Layout>
  );
}

export default Community;

const initialGuestBookState = {
  title: "",
  comment: "",
};

const PostDisplayMode = (setEditModeId, removeCommunity) =>
  memo(({ id, title, comment, editModeId }) => (
    <>
      <div className="txt">
        <h2>{title}</h2>
        <p>{comment}</p>
      </div>
      <nav className="btnSet">
        <button onClick={() => setEditModeId(id)}>EDIT</button>
        <button onClick={() => removeCommunity(id)}>DELETE</button>
      </nav>
    </>
  ));

const PostEditMode = (setEditModeId, updateCommunity) =>
  memo(({ id, title, comment, editModeId }) => {
    const [{ title: $title, comment: $comment }, onChange, reset] = useInputs({
      title: title,
      comment: comment,
    });

    return (
      <>
        <div className="txt">
          <input type="text" name="title" value={$title} onChange={onChange} />
          <textarea name="comment" value={$comment} onChange={onChange} />
        </div>
        <nav className="btnSet">
          <button onClick={() => setEditModeId("")}>CANCEL</button>
          <button
            onClick={() =>
              updateCommunity({
                id: id,
                title: $title,
                comment: $comment,
              })
            }
          >
            UPDATE
          </button>
        </nav>
      </>
    );
  });
