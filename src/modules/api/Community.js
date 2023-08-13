import $K from "../data/Constants";
import { $delete, $get, $post, $put } from "./Axios";

export const getCommunity = async () => {
  return await $get(`${$K.PUBLIC_URL}/community`);
};

export const postCommunity = async (communityRequestDTO) => {
  return await $post(`${$K.PUBLIC_URL}/community`, communityRequestDTO);
};

export const putCommunity = async (communityRequestDTO) => {
  return await $put(
    `${$K.PUBLIC_URL}/community/${communityRequestDTO.id}`,
    communityRequestDTO
  );
};

export const deleteCommunity = async (communityId) => {
  return await $delete(`${$K.PUBLIC_URL}/community/${communityId}`);
};
