import axios from "axios";
import $K from "../data/Constants";

export const getMembers = async () => {
  return await axios.get(`${$K.PUBLIC_URL}/members`);
};
