import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import { kakaoMapApi } from "../apiKey";
import { loadScript } from "../modules/utils/ImportExternalScript";
import Constants from "../modules/data/Constants";

function Contact(props) {
  const kakaoMapRef = useRef(null);
  const [loadKakaoMapScript, setLoadKakaoMapScript] = useState(null);
  const [location, setLocation] = useState({
    latitude: 33.450701, // 위도
    longitude: 126.570667, // 경도
  });
  const { kakao } = window;

  useEffect(() => {
    let removeScript;
    const loadKakaoMapApi = async () => {
      try {
        const result = await loadScript({
          src: kakaoMapApiScriptSrc,
        });
        setLoadKakaoMapScript(result.load);
        if (result.load) {
          removeScript = result.removeScript;
        }
      } catch (e) {
        console.error(`You cannot use kakao map, error: ${e}`);
      }
    };
    loadKakaoMapApi();

    // return () => removeScript && removeScript();
  }, []);

  const createLocation = (latitude, longitude) =>
    new kakao.maps.LatLng(latitude, longitude);

  const createMapInstance = (element, options) =>
    new kakao.maps.Map(element, options);

  const createMarker = (mapInstance, location) => {
    const marker = new kakao.maps.Marker({ position: location });
    marker.setMap(mapInstance);
    return marker;
  };

  useEffect(() => {
    if (loadKakaoMapScript) {
      kakao.maps.load(function () {
        const targetLocation = createLocation(
          location.latitude,
          location.longitude
        );
        const options = {
          center: targetLocation, // 지도의 중심좌표
          level: 3, // 지도의 레벨(확대, 축소 정도)
        };

        const mapInstance = createMapInstance(kakaoMapRef.current, options);

        const marker = createMarker(mapInstance, targetLocation);
      });
    }
  }, [loadKakaoMapScript, location]);

  return (
    <Layout
      name={"Contact"}
      backgroundImageUrl={`${Constants.PUBLIC_URL}/img/Location.jpg`}
    >
      <div id="kakaoMap" ref={kakaoMapRef}></div>
    </Layout>
  );
}

export default Contact;

const kakaoMapApiBaseUrl =
  "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=";
const kakaoMapApiScriptSrc = kakaoMapApiBaseUrl + kakaoMapApi;
