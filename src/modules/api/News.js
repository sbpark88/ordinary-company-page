import axios from "axios";
import $K from "../data/Constants";
import { NewsURL } from "../data/URL";

export const getNews = async () => {
  return await axios.get($K.PUBLIC_URL + NewsURL.get);
};
