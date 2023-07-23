export class KakaoMap {
  #kakaoMaps;

  CONTROL_POSITION = {
    TOP: "TOP",
    TOP_LEFT: "TOPLEFT",
    TOP_RIGHT: "TOPRIGHT",
    LEFT: "LEFT",
    RIGHT: "RIGHT",
    BOTTOM_LEFT: "BOTTOMLEFT",
    BOTTOM: "BOTTOM",
    BOTTOM_RIGHT: "BOTTOMRIGHT",
  };
  constructor(kakao) {
    this.#kakaoMaps = kakao.maps;
  }

  get load() {
    return this.#kakaoMaps.load;
  }

  createLocation({ latitude, longitude }) {
    return new this.#kakaoMaps.LatLng(latitude, longitude);
  }

  createMapInstance(element, location, level = 3) {
    const options = {
      center: location, // 지도의 중심좌표
      level: level, // 지도의 레벨(확대, 축소 정도)
    };
    return new this.#kakaoMaps.Map(element, options);
  }

  createMarkerImage({ imageSrc, imageSize, imageOffset }) {
    return new this.#kakaoMaps.MarkerImage(
      imageSrc,
      new this.#kakaoMaps.Size(imageSize?.x, imageSize?.y),
      { offset: new this.#kakaoMaps.Point(imageOffset?.x, imageOffset?.y) }
    );
  }
  addMarker(mapInstance, location, image) {
    const marker = new this.#kakaoMaps.Marker({
      position: location,
      image: image,
    });
    marker.setMap(mapInstance);
    return marker;
  }

  addTraffic(mapInstance, display) {
    display
      ? mapInstance?.addOverlayMapTypeId(this.#kakaoMaps.MapTypeId.TRAFFIC)
      : mapInstance?.removeOverlayMapTypeId(this.#kakaoMaps.MapTypeId.TRAFFIC);
  }

  #createMapTypeControl() {
    return new this.#kakaoMaps.MapTypeControl();
  }

  addTypeControl(
    mapInstance,
    controlPosition = this.CONTROL_POSITION.TOP_RIGHT
  ) {
    mapInstance?.addControl(
      this.#createMapTypeControl(),
      this.#kakaoMaps.ControlPosition[controlPosition]
    );
  }

  #createZoomControl() {
    return new this.#kakaoMaps.ZoomControl();
  }

  addZoomControl(mapInstance, controlPosition = this.CONTROL_POSITION.RIGHT) {
    mapInstance?.addControl(
      this.#createZoomControl(),
      this.#kakaoMaps.ControlPosition[controlPosition]
    );
  }
}
