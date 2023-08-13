import React, { memo, useCallback, useEffect, useRef, useState } from "react";
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
import {
  ConfirmDelete,
  Toast,
  toastDefaultApiError,
} from "../modules/utils/UiHelper";

function Community() {
  const [{ title, comment }, changeCommunity, resetCommunity] = useInputs(
    initialGuestBookState
  );
  const [communities, setCommunities] = useState([]);
  const [editModeId, setEditModeId] = useState();

  const loadCommunity = useCallback(async () => {
    try {
      const response = await getCommunity();
      setCommunities(response);
    } catch (e) {
      toastDefaultApiError();
    }
  }, []);

  const createCommunity = useCallback(async () => {
    if (stringIsEmpty(title) || stringIsEmpty(comment)) {
      Toast.info("제목과 본문을 입력해주세요.");
      return null;
    }
    const requestDTO = new CommunityDTO({ title, comment });
    await postCommunity(requestDTO);
    resetCommunity();
    await loadCommunity();
  }, [title, comment, resetCommunity, loadCommunity]);
  const throttledCreateCommunity = throttle(createCommunity, 3000);

  const updateCommunity = useCallback(
    async ({ id, title, comment }) => {
      const requestDTO = new CommunityDTO({ id, title, comment });
      await putCommunity(requestDTO);
      setEditModeId(undefined);
      await loadCommunity();
    },
    [loadCommunity]
  );

  const removeCommunity = useCallback(
    async (id) => {
      await ConfirmDelete(() => deleteCommunity(id), loadCommunity);
    },
    [loadCommunity]
  );

  const DisplayCommunity = PostDisplayMode(setEditModeId, removeCommunity);
  const EditCommunity = PostEditMode(setEditModeId, updateCommunity);

  useEffect(() => {
    loadCommunity();
  }, [loadCommunity]);

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
            <DisplayCommunity
              key={community.id}
              {...community}
              editModeId={editModeId}
            />
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
  memo(({ id, title, comment, editModeId }) => {
    return (
      <article
        className={editModeId && id !== editModeId ? "blocked-content" : ""}
      >
        <div className="txt">
          <h2>{title}</h2>
          <p>{comment}</p>
        </div>
        <nav className="btnSet">
          <button onClick={() => setEditModeId(id)}>EDIT</button>
          <button onClick={() => removeCommunity(id)}>DELETE</button>
        </nav>
      </article>
    );
  });

const PostEditMode = (setEditModeId, updateCommunity) =>
  memo(({ id, title, comment, editModeId }) => {
    const [{ title: $title, comment: $comment }, onChange, reset] = useInputs({
      title: title,
      comment: comment,
    });

    return (
      <article>
        <div className="txt">
          <Input type="text" name="title" data={$title} setData={onChange} />
          <Textarea name="comment" data={$comment} setData={onChange} />
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
      </article>
    );
  });
