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
  let kakaoMap;

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
      kakaoMap = new KakaoMap(kakao);
      kakaoMap.load(function () {
        const targetLocation = kakaoMap.createLocation(
          location.latitude,
          location.longitude
        );
        const mapInstance = kakaoMap.createMapInstance(
          kakaoMapRef.current,
          targetLocation,
          2
        );

        const markerImage = kakaoMap.createMarkerImage(
          `${Constants.PUBLIC_URL}/img/marker1.png`,
          { x: 232, y: 99 },
          { x: 115, y: 110 }
        );

        const marker = kakaoMap.createMarker(
          mapInstance,
          targetLocation,
          markerImage
        );
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
