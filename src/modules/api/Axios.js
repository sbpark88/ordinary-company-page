import axios from "axios";
import $K from "../data/Constants";

const $api = axios.create({
  // baseURL: 'http://localhost:3000' // Can be omitted as this is the default
  baseURL: $K.PUBLIC_URL,
});

const $get = async (url, data) =>
  await $api.get(url, data).then(successHandler).catch(errorHandler);
const $post = async (url, data) =>
  await $api.post(url, data).then(successHandler).catch(errorHandler);
const $put = async (url, data) =>
  await $api.put(url, data).then(successHandler).catch(errorHandler);
const $patch = async (url, data) =>
  await $api.patch(url, data).then(successHandler).catch(errorHandler);
const $delete = async (url, data) =>
  await $api.delete(url, data).then(successHandler).catch(errorHandler);

const successHandler = (res) => {
  if ((res.status / 200).toFixed() !== "1") {
    throw new HTTPError(res.status, res.statusText);
  } else {
    return res.data;
  }
};

const errorHandler = (error) => {
  // Step 1. Send error to server for log.
  // Step 2. Throw error to components
  throw error;
};

class HTTPError extends Error {
  constructor(status, statusText) {
    super(`HTTP Error ${status}: ${statusText}`);
    this.status = status;
    this.statusText = statusText;
  }
}

export { $api, $get, $post, $put, $patch, $delete };
