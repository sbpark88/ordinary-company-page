import axios from "axios";
import $K from "../data/Constants";

export const getNews = async () => {
  return await axios.get(`${$K.PUBLIC_URL}/news`);
};
