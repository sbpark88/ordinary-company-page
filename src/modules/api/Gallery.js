import { flickrApi } from "../../apiKey";
import { objectToUrlParams } from "../utils/StringUtils";
import { $get } from "./Axios";

const baseUrl = "https://www.flickr.com/services/rest/";
const getFlickrImages = async (options) => {
  const params = objectToUrlParams(options);
  return await $get(`${baseUrl}?${params}`);
};

export const getFlickrImagesOfInterest = async () => {
  const options = setOptions({ method: FlickrMethodType.interest });
  return await getFlickrImages(options);
};

export const getFlickrImagesOfTags = async (searchingText) => {
  const options = setOptions({
    method: FlickrMethodType.search,
    tags: searchingText,
  });
  return await getFlickrImages(options);
};

export const getFlickrImagesOfUser = async (userId) => {
  const options = setOptions({
    method: FlickrMethodType.user,
    user_id: userId,
  });
  return await getFlickrImages(options);
};

export const FlickrMethodType = {
  interest: "flickr.interestingness.getList",
  search: "flickr.photos.search",
  user: "flickr.people.getPhotos",
};

const defaultOptions = Object.freeze({
  api_key: flickrApi,
  format: "json",
  nojsoncallback: 1,
});

const setOptions = ({ method, per_page = "50", tags, user_id }) => {
  return {
    ...defaultOptions,
    method: method,
    per_page: per_page,
    tags: tags,
    user_id: user_id,
  };
};
