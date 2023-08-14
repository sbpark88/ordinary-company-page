import { objToUrlParams, OpenApiURL } from "../data/URL";
import { $get } from "./Axios";

const apiKey = (await import("../../apiKey")).youtubeApiV3;

const options = {
  part: "snippet",
  key: apiKey,
  playlistId: "PLRROPbx6xj0Gsti_vFYy_p-NUuXDMPCT7",
  maxResults: 10,
};
export const getYoutube = async () =>
  await $get(`${OpenApiURL.youtubePlaylist}?${objToUrlParams(options)}`);
