import $K from "./Constants";

export const contactLocations = {
  timeSquare: {
    name: "영등포 타임스퀘어",
    location: { latitude: 37.517279041628505, longitude: 126.90351232678233 },
    imageSrc: `${$K.PUBLIC_URL}/img/marker1.png`,
    imageSize: { x: 232, y: 99 },
    imageOffset: { x: 116, y: 99 },
  },
  coex: {
    name: "삼성역 코엑스",
    location: { latitude: 37.51222884248784, longitude: 127.05894061246958 },
    imageSrc: `${$K.PUBLIC_URL}/img/marker2.png`,
    imageSize: { x: 232, y: 99 },
    imageOffset: { x: 116, y: 99 },
  },
  seoulCityHall: {
    name: "서울 시청",
    location: { latitude: 37.566801646956456, longitude: 126.9784824794608 },
    imageSrc: `${$K.PUBLIC_URL}/img/marker3.png`,
    imageSize: { x: 232, y: 99 },
    imageOffset: { x: 116, y: 99 },
  },
};
