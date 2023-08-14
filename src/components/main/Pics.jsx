import React, { memo, useCallback, useEffect, useState } from "react";
import { btnScrollTargetClass } from "./Btns";
import { getFlickrImagesOfUser } from "../../modules/api/Flickr";
import $K from "../../modules/data/Constants";
import { toastDefaultApiError } from "../../modules/utils/UiHelper";
import { randomSort } from "../../modules/utils/ArrayUtils";

function Pics() {
  const [pictureUrl, setPictureUrl] = useState([]);

  const getRandomTwoGalleries = useCallback(async () => {
    const response = await getFlickrImagesOfUser($K.FLICKR.MY_USER_ID);
    if (response?.stat === "ok") {
      setPictureUrl(
        response?.photos?.photo
          ?.toSorted(randomSort)
          .filter((_, index) => index < 2)
          .map(
            (pic) =>
              `https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`
          )
      );
    }
  }, []);

  useEffect(() => {
    try {
      getRandomTwoGalleries();
    } catch (e) {
      toastDefaultApiError();
    }
  }, [getRandomTwoGalleries]);

  return (
    <section id="pics" className={btnScrollTargetClass} data-page-name="pics">
      {pictureUrl?.map((url) => (
        <div className="pic">
          <img src={url} alt="random picture" />
        </div>
      ))}
    </section>
  );
}

export default memo(Pics);
