import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import { kakaoMapApi } from "../apiKey";
import { loadScript } from "../modules/utils/ImportExternalScript";

function Contact(props) {
  const kakaoMapRef = useRef(null);

  const [loadKakaoMapScript, setLoadKakaoMapScript] = useState(null);

  useEffect(() => {
    let removeScript;
    const loadKakaoMapApi = async () => {
      try {
        const result = await loadScript({ src: kakaoMapApiScriptSrc });
        setLoadKakaoMapScript(result.load);
        if (result.load) {
          removeScript = result.removeScript;
        }
      } catch (e) {
        console.error(`You cannot use kakao map, error: ${e}`);
      }
    };
    loadKakaoMapApi();

    return () => removeScript && removeScript();
  }, []);

  return <Layout name={"Contact"}></Layout>;
}

export default Contact;

const kakaoMapApiBaseUrl = "//dapi.kakao.com/v2/maps/sdk.js?appkey=";
const kakaoMapApiScriptSrc = kakaoMapApiBaseUrl + kakaoMapApi;
