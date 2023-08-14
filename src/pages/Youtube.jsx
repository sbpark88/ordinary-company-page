import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import {
  convertTimeIso8601toKoreanYearMonthDay,
  dropLongString,
} from "../modules/utils/StringUtils";
import Modal from "../components/layout/Modal";
import $K from "../modules/data/Constants";
import { toastDefaultApiError } from "../modules/utils/UiHelper";
import YoutubeIframe from "../components/common/YoutubeIframe";
import { getYoutube } from "../modules/api/Youtube";

function Youtube() {
  const [vids, setVids] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const modal = useRef(null);
  const getYoutubeList = async () => {
    try {
      const response = await getYoutube();
      setVids(response.items);
    } catch (e) {
      toastDefaultApiError();
    }
  };

  useEffect(() => {
    getYoutubeList();
  }, []);

  return (
    <>
      <Layout
        name={"Youtube"}
        backgroundImageUrl={`${$K.PUBLIC_URL}/img/Youtube.jpg`}
      >
        {vids.map((vid) => (
          <VideoCard
            key={vid?.id}
            {...generatePropsForVideoCard(vid, modal, setSelectedId)}
          />
        ))}
      </Layout>
      <Modal ref={modal}>
        {selectedId && <YoutubeIframe vids={vids} selectedId={selectedId} />}
      </Modal>
    </>
  );
}

export default Youtube;

function VideoCard(props) {
  const { id, url, title, description, publishedAt, modal, setSelectedId } =
    props;

  if (
    id === undefined ||
    url === undefined ||
    title === undefined ||
    description === undefined ||
    publishedAt === undefined ||
    modal === undefined
  )
    return null;

  return (
    <article>
      <h2>{title}</h2>
      <div className="txt">
        <p>{description}</p>
        <span>{publishedAt}</span>
      </div>
      <div
        className="pic"
        onClick={() => {
          modal.current.openModal();
          setSelectedId(id);
        }}
      >
        <img src={url} alt={title} />
      </div>
    </article>
  );
}

// Generate props for Layout
const generatePropsForVideoCard = (vid, modal, setSelectedId) => {
  return {
    id: vid?.id,
    url: vid?.snippet.thumbnails.standard.url,
    title: dropLongString(vid?.snippet.title, 50),
    description: dropLongString(vid?.snippet.description, 200),
    publishedAt: convertTimeIso8601toKoreanYearMonthDay(
      vid?.snippet.publishedAt
    ),
    modal: modal,
    setSelectedId: setSelectedId,
  };
};
