export class KakaoMap {
  #kakaoMaps;
  constructor(kakao) {
    this.#kakaoMaps = kakao.maps;
  }

  get load() {
    return this.#kakaoMaps.load;
  }

  createLocation(latitude, longitude) {
    return new this.#kakaoMaps.LatLng(latitude, longitude);
  }

  createMapInstance(element, location, level = 3) {
    const options = {
      center: location, // 지도의 중심좌표
      level: level, // 지도의 레벨(확대, 축소 정도)
    };
    return new this.#kakaoMaps.Map(element, options);
  }

  createMarkerImage(imageSrc, imageSize, imageOffset) {
    return new this.#kakaoMaps.MarkerImage(
      imageSrc,
      new this.#kakaoMaps.Size(imageSize?.x, imageSize?.y),
      { offset: new this.#kakaoMaps.Point(imageOffset?.x, imageOffset?.y) }
    );
  }
  createMarker(mapInstance, location, image) {
    const marker = new this.#kakaoMaps.Marker({
      position: location,
      image: image,
    });
    marker.setMap(mapInstance);
    return marker;
  }
}
