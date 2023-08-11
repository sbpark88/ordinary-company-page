import { $get } from "./Axios";

export const getNews = async () => await $get(`/news`);
