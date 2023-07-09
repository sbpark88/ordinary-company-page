import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { objToUrlParams, openApi } from "../modules/data/URL";
import { dropLongString } from "../modules/utils/StringUtils";
import Modal from "../components/layout/Modal";

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
    const url = `${openApi.youtubePlaylist}?${objToUrlParams(options)}`;

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
      <Layout name={"Youtube"}>
        {vids.map((vid) => {
          const props = {
            id: vid?.id,
            url: vid?.snippet.thumbnails.standard.url,
            title: dropLongString(vid?.snippet.title, 50),
            description: dropLongString(vid?.snippet.description, 200),
            publishedAt: dateFormatWithDot(vid?.snippet.publishedAt),
            modal: modal,
            setSelectedId: setSelectedId,
          };

          return <VideoCard key={vid?.id} {...props} />;
        })}
      </Layout>
      <Modal ref={modal}>{selectedId && youtubeIframe(vids, selectedId)}</Modal>
    </>
  );
}

// 2023-07-09T00:22:29Z 형식을 받아 2023.07.09 로 반환
function dateFormatWithDot(str) {
  return str.split("T")[0].replaceAll("-", ".");
}

function youtubeIframe(vids, selectedId) {
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
}

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
          console.log(id);
        }}
      >
        <img src={url} alt={title} />
      </div>
    </article>
  );
}

export default Youtube;
