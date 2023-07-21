import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import { kakaoMapApi } from "../apiKey";
import { loadScript } from "../modules/utils/ImportExternalScript";
import Constants from "../modules/data/Constants";
import { KakaoMap } from "../modules/utils/KakaoMap";

function Contact(props) {
  const kakaoMapRef = useRef(null);
  const [loadKakaoMapScript, setLoadKakaoMapScript] = useState(null);
  const [location, setLocation] = useState({
    latitude: 37.517279041628505, // 위도
    longitude: 126.90351232678233, // 경도
  });
  const { kakao } = window;
  const kakaoMap = useRef(); // KakaoMap Class Instance
  const mapInstance = useRef(); // KakaoMap Instance
  const [traffic, setTraffic] = useState(false);

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

  useEffect(() => {
    if (loadKakaoMapScript) {
      kakaoMap.current = new KakaoMap(kakao);
      kakaoMap.current?.load(function () {
        const targetLocation = kakaoMap.current?.createLocation(
          location.latitude,
          location.longitude
        );
        mapInstance.current = kakaoMap.current?.createMapInstance(
          kakaoMapRef.current,
          targetLocation,
          2
        );

        const markerImage = kakaoMap.current?.createMarkerImage(
          `${Constants.PUBLIC_URL}/img/marker1.png`,
          { x: 232, y: 99 },
          { x: 115, y: 110 }
        );

        const marker = kakaoMap.current?.createMarker(
          mapInstance.current,
          targetLocation,
          markerImage
        );
      });
    }
  }, [loadKakaoMapScript, location]);

  useEffect(() => {
    kakaoMap.current?.displayTraffic(mapInstance.current, traffic);
  }, [traffic]);

  return (
    <Layout
      name={"Contact"}
      backgroundImageUrl={`${Constants.PUBLIC_URL}/img/Location.jpg`}
    >
      <button
        id="btnToggleTraffic"
        onClick={() => setTraffic(!traffic)}
        className={traffic ? "on" : ""}
      >
        {traffic ? "교통정보 On" : "교통정보 Off"}
      </button>
      <div id="kakaoMap" ref={kakaoMapRef}></div>
    </Layout>
  );
}

export default Contact;

const kakaoMapApiBaseUrl =
  "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=";
const kakaoMapApiScriptSrc = kakaoMapApiBaseUrl + kakaoMapApi;
