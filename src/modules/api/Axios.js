import axios from "axios";
import $K from "../data/Constants";

const $api = axios.create({
  // baseURL: 'http://localhost:3000' // Can be omitted as this is the default
  baseURL: $K.PUBLIC_URL,
});

const $get = async (url, data) => {
  return await $api
    .get(url, data)
    .then((res) => res.data)
    .catch((e) => errorHandler(e));
};
const $post = async (url, data) => {
  return await $api
    .post(url, data)
    .then((res) => res.data)
    .catch((e) => errorHandler(e));
};
const $put = async (url, data) => {
  return await $api
    .put(url, data)
    .then((res) => res.data)
    .catch((e) => errorHandler(e));
};
const $patch = async (url, data) => {
  return await $api
    .patch(url, data)
    .then((res) => res.data)
    .catch((e) => errorHandler(e));
};
const $delete = async (url, data) => {
  return await $api
    .delete(url, data)
    .then((res) => res.data)
    .catch((e) => errorHandler(e));
};

const errorHandler = async (error) => {
  // Step 1. Send error to server for log.
  // Step 2. Throw error to components
  throw error;
};

export { $api, $get, $post, $put, $patch, $delete };
