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
            id: vid.id,
            url: vid.snippet.thumbnails.standard.url,
            title: dropLongString(vid.snippet.title, 50),
            description: dropLongString(vid.snippet.description, 200),
            publishedAt: dateFormatWithDot(vid.snippet.publishedAt),
            modal: modal,
          };

          return <VideoCard {...props} />;
        })}
      </Layout>
      <Modal ref={modal} />
    </>
  );
}

// 2023-07-09T00:22:29Z 형식을 받아 2023.07.09 로 반환
function dateFormatWithDot(str) {
  return str.split("T")[0].replaceAll("-", ".");
}
function VideoCard(props) {
  const { id, url, title, description, publishedAt, modal } = props;

  if (
    id === undefined ||
    url === undefined ||
    title === undefined ||
    description === undefined ||
    publishedAt === undefined
  )
    return null;

  return (
    <article key={id}>
      <h2>{title}</h2>
      <div className="txt">
        <p>{description}</p>
        <span>{publishedAt}</span>
      </div>
      <div className="pic" onClick={() => modal.current.openModal()}>
        <img src={url} alt={title} />
      </div>
    </article>
  );
}

export default Youtube;
