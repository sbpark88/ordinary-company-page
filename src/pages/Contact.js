import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import { kakaoMapApi } from "../apiKey";
import { loadScript } from "../modules/utils/ImportExternalScript";
import Constants from "../modules/data/Constants";
import { KakaoMap } from "../modules/utils/KakaoMap";
import { contactLocations } from "../modules/data/ContactLocations";

function Contact(props) {
  const kakaoMapRef = useRef(null);
  const [loadKakaoMapScript, setLoadKakaoMapScript] = useState(null);
  const [location, setLocation] = useState(contactLocations.coex);

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
      kakaoMap.current = new KakaoMap(window.kakao);
      kakaoMap.current?.load(function () {
        const targetLocation = kakaoMap.current?.createLocation(
          location.location
        );
        mapInstance.current = kakaoMap.current?.createMapInstance(
          kakaoMapRef.current,
          targetLocation,
          4
        );

        Object.entries(contactLocations).map(([name, loc]) =>
          kakaoMap.current?.createMarker(
            mapInstance.current,
            kakaoMap.current?.createLocation(loc.location),
            kakaoMap.current?.createMarkerImage({ ...loc })
          )
        );
      });
    }
  }, [loadKakaoMapScript, location]);

  useEffect(() => {
    kakaoMap.current?.displayTraffic(mapInstance.current, traffic);
  }, [location, traffic]);

  return (
    <Layout
      name={"Contact"}
      backgroundImageUrl={`${Constants.PUBLIC_URL}/img/Location.jpg`}
    >
      <ul>
        {Object.entries(contactLocations).map(([name, loc]) => (
          <li
            key={name}
            onClick={() => setLocation(loc)}
            className={loc.name === location.name ? "on" : ""}
          >
            {loc.name}
          </li>
        ))}
      </ul>
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
