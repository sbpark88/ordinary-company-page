import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import { kakaoMapApi } from "../apiKey";
import { loadScript } from "../modules/utils/ImportExternalScript";
import Constants from "../modules/data/Constants";
import { KakaoMap } from "../modules/utils/KakaoMap";
import { contactLocations } from "../modules/data/ContactLocations";
import { applyMapToObject } from "../modules/utils/ObjectUtils";

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
      kakaoMapRef.current.innerHTML = ""; // 리액트에서 카카오 지도 줌 컨트롤러를 추가하면 화면을 그리기 전 지도를 지워야 중첩 없이 정상 작동한다.
      kakaoMap.current = new KakaoMap(window.kakao);
      kakaoMap.current?.load(function () {
        // 1. 지도 생성
        const targetLocation = kakaoMap.current?.createLocation(
          location.location
        );
        mapInstance.current = kakaoMap.current?.createMapInstance(
          kakaoMapRef.current,
          targetLocation,
          4
        );

        // 2. 지정된 위치에 마커 표시
        const applyAddMarker = (name, loc) =>
          kakaoMap.current?.addMarker(
            mapInstance.current,
            kakaoMap.current?.createLocation(loc.location),
            kakaoMap.current?.createMarkerImage({ ...loc })
          );
        const marker = applyMapToObject(contactLocations)(applyAddMarker);

        // 3. 지도 타입 변환 컨트롤 추가
        kakaoMap.current?.addTypeControl(mapInstance.current);

        // 4. 지도 확대/축소 컨트롤 추가
        //    리액트에서 카카오 지도 줌 컨트롤을 추가하면 화면을 그리기 전
        //    `kakaoMapRef.current.innerHTML = ""` 를 해줘야 지도 중첨이 안 생긴다.
        kakaoMap.current?.addZoomControl(mapInstance.current);

        // 5. 브라우저 리사이즈 시 지도 위치 센터 유지
        const setLocationToCenter = () => {
          mapInstance.current.setCenter(targetLocation);
        };
        window.addEventListener("resize", setLocationToCenter);
        return () => window.removeEventListener("resize", setLocationToCenter);
      });
    }
  }, [loadKakaoMapScript, location]);

  useEffect(() => {
    // 교통정보 추가/제거
    kakaoMap.current?.addTraffic(mapInstance.current, traffic);
  }, [location, traffic]);

  function ContactLocationLiElement(name, loc) {
    return (
      <li
        key={name}
        onClick={() => setLocation(loc)}
        className={loc.name === location.name ? "on" : ""}
      >
        {loc.name}
      </li>
    );
  }

  return (
    <Layout
      name={"Contact"}
      backgroundImageUrl={`${Constants.PUBLIC_URL}/img/Location.jpg`}
    >
      <ul>{applyMapToObject(contactLocations)(ContactLocationLiElement)}</ul>
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
