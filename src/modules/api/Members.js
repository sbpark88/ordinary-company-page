import { $get } from "./Axios";

export const getMembers = async () => await $get(`/member`);
