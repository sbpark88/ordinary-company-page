import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { objToUrlParams, openApi } from "../modules/data/URL";

const apiKey = (await import("../apiKey")).youtubeApiV3;

const options = {
  part: "snippet",
  key: apiKey,
  playlistId: "PLRROPbx6xj0Gsti_vFYy_p-NUuXDMPCT7",
  maxResults: 10,
};
function Youtube(props) {
  const [vids, setVids] = useState([]);
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
    <Layout name={"Youtube"}>
      {vids.map((vid) => {
        const children = {
          id: vid.id,
          url: vid.snippet.thumbnails.standard.url,
          title: vid.snippet.title,
          description: vid.snippet.description,
          publishedAt: vid.snippet.publishedAt,
        };

        return (
          <VideoCard
            key={children.id}
            id={children.id}
            url={children.url}
            title={children.title}
            description={children.description}
            publishedAt={children.publishedAt}
          />
        );
      })}
    </Layout>
  );
}

function VideoCard({ id, url, title, description, publishedAt }) {
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
      <img src={url} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <span>{publishedAt}</span>
    </article>
  );
}

export default Youtube;
