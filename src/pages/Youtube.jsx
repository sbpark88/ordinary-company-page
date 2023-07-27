import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { objToUrlParams, OpenApiURL } from "../modules/data/URL";
import { dropLongString } from "../modules/utils/StringUtils";
import Modal from "../components/layout/Modal";
import $K from "../modules/data/Constants";

const apiKey = (await import("../apiKey")).youtubeApiV3;

const options = {
  part: "snippet",
  key: apiKey,
  playlistId: "PLRROPbx6xj0Gsti_vFYy_p-NUuXDMPCT7",
  maxResults: 10,
};

function Youtube(props) {
  const [vids, setVids] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const modal = useRef(null);
  const getYoutubeList = async () => {
    const url = `${OpenApiURL.youtubePlaylist}?${objToUrlParams(options)}`;

    try {
      const response = await axios.get(url);
      setVids(response.data.items);
    } catch (e) {
      console.error(e);
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
            {...generateProps(vid, modal, setSelectedId)}
          />
        ))}
      </Layout>
      <Modal ref={modal}>{selectedId && youtubeIframe(vids, selectedId)}</Modal>
    </>
  );
}

// Generate props for Layout
const generateProps = (vid, modal, setSelectedId) => {
  return {
    id: vid?.id,
    url: vid?.snippet.thumbnails.standard.url,
    title: dropLongString(vid?.snippet.title, 50),
    description: dropLongString(vid?.snippet.description, 200),
    publishedAt: dateFormatWithDot(vid?.snippet.publishedAt),
    modal: modal,
    setSelectedId: setSelectedId,
  };
};

// 2023-07-09T00:22:29Z 형식을 받아 2023.07.09 로 반환
const dateFormatWithDot = (str) => {
  return str.split("T")[0].replaceAll("-", ".");
};

const youtubeIframe = (vids, selectedId) => {
  if (vids === undefined || selectedId === undefined) return null;

  const match = vids.filter((vid) => vid?.id === selectedId)[0];
  if (match === null || match === undefined) return null;

  const title = match.snippet.title;
  const videoId = match.snippet.resourceId.videoId;

  return (
    <iframe
      title={title}
      src={`https://www.youtube.com/embed/${videoId}`}
    ></iframe>
  );
};

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

export default Youtube;
