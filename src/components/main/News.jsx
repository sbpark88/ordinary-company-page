import React, { useEffect, useState } from "react";
import { btnScrollTargetClass } from "./Btns";
import $K from "../../modules/data/Constants";
import { getNews } from "../../modules/api/News";

function News(props) {
  const [news, setNews] = useState([]);

  const getNewsList = async () => {
    const response = await getNews();
    await setNews(response.data);
  };

  useEffect(() => {
    try {
      getNewsList();
    } catch (e) {
      console.error(e);
    }
  }, []);

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

function Article({ id, content }) {
  return <article data-article-id={id}>{content}</article>;
}

const sectionStyle = {
  backgroundImage: `url(${$K.PUBLIC_URL}/img/News.jpg`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "top left",
};

export default News;
