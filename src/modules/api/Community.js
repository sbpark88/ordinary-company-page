import axios from "axios";
import $K from "../data/Constants";

export const getCommunity = async () => {
  return await axios.get(`${$K.PUBLIC_URL}/community`);
};

export const postCommunity = async (communityRequestDTO) => {
  return await axios.post(`${$K.PUBLIC_URL}/community`, communityRequestDTO);
};

export const putCommunity = async (communityRequestDTO) => {
  return await axios.put(
    `${$K.PUBLIC_URL}/community/${communityRequestDTO.id}`,
    communityRequestDTO
  );
};

export const deleteCommunity = async (communityId) => {
  return await axios.delete(`${$K.PUBLIC_URL}/community/${communityId}`);
};
