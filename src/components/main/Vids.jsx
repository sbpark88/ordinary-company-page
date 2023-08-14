import React, { memo, useCallback, useEffect, useState } from "react";
import { btnScrollTargetClass } from "./Btns";
import YoutubeIframe from "../common/YoutubeIframe";
import { toastDefaultApiError } from "../../modules/utils/UiHelper";
import { getYoutube } from "../../modules/api/Youtube";
import { randomSort } from "../../modules/utils/ArrayUtils";

function Vids() {
  const [youtube, setYoutube] = useState();

  const getRandomYoutube = useCallback(async () => {
    const response = await getYoutube();
    const randomOne = response?.items?.toSorted(randomSort)[0];
    randomOne && setYoutube(randomOne);
  }, []);

  useEffect(() => {
    try {
      getRandomYoutube();
    } catch (e) {
      toastDefaultApiError();
    }
  }, [getRandomYoutube]);

  return (
    <section id="vids" className={btnScrollTargetClass} data-page-name="vids">
      <div className="vid-container">
        {youtube && <YoutubeIframe vids={[youtube]} selectedId={youtube.id} />}
      </div>
    </section>
  );
}

export default memo(Vids);
