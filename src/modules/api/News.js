import axios from "axios";
import Constants from "../data/Constants";
import { NewsURL } from "../data/URL";

export const getNews = async () => {
  return await axios.get(Constants.PUBLIC_URL + NewsURL.get);
};
