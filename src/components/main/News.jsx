import React, { memo, useCallback, useEffect, useState } from "react";
import { btnScrollTargetClass } from "./Btns";
import $K from "../../modules/data/Constants";
import { toastDefaultApiError } from "../../modules/utils/UiHelper";
import { getCommunity } from "../../modules/api/Community";

function News(props) {
  const [news, setNews] = useState([]);

  const getLastFourCommunity = useCallback(async () => {
    const response = await getCommunity();
    const lastFourCommunity = response
      ?.toSorted((lhs, rhs) => (lhs.id > rhs.id ? -1 : 1))
      .filter((community, index) => index < 4);
    setNews(lastFourCommunity);
  }, []);

  useEffect(() => {
    try {
      getLastFourCommunity();
    } catch (e) {
      toastDefaultApiError();
    }
  }, [getLastFourCommunity]);

  return (
    <section
      id="news"
      className={btnScrollTargetClass}
      data-page-name="news"
      style={sectionStyle}
    >
      {news.map((item) => (
        <Article key={item.id} {...item} />
      ))}
    </section>
  );
}

function Article({ id, title, comment }) {
  return (
    <article data-article-id={id}>
      <p>{title}</p>
      {comment}
    </article>
  );
}

const sectionStyle = {
  backgroundImage: `url(${$K.PUBLIC_URL}/img/News.jpg`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "top left",
};

export default memo(News);
