import axios from "axios";
import Constants from "../data/Constants";
import { MembersURL } from "../data/URL";

export const getMembers = async () => {
  return await axios.get(Constants.PUBLIC_URL + MembersURL.get);
};
