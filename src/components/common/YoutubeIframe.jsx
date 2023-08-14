import React from "react";

function YoutubeIframe({ vids, selectedId }) {
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

export default YoutubeIframe;
