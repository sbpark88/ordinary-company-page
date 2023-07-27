import axios from "axios";
import $K from "../data/Constants";
import { MembersURL } from "../data/URL";

export const getMembers = async () => {
  return await axios.get($K.PUBLIC_URL + MembersURL.get);
};
