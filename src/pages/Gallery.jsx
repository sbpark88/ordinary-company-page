import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import $K from "../modules/data/Constants";
import {
  getFlickrImagesOfInterest,
  getFlickrImagesOfTags,
  getFlickrImagesOfUser,
} from "../modules/api/Gallery";
import Modal from "../components/layout/Modal";
import Masonry from "react-masonry-component";
import { Input } from "../components/common/Input";
import useInputs from "../hooks/UseInputs";
import { stringIsEmpty } from "../modules/utils/StringUtils";
import { Loading } from "../components/layout/Loading";

function Gallery() {
  const [loading, setLoading] = useState(false);
  const [noSearch, setNoSearch] = useState(false);
  const [galleries, setGalleries] = useState();
  const [selectedImageUrl, setSelectedImageUrl] = useState();
  const modal = useRef(null);
  const [{ searchText }, setSearch, resetSearch] = useInputs({
    searchText: "",
  });
  const [galleryType, setGalleryType] = useState(GalleryType.interest);

  const getGalleries =
    (getApi) =>
    async (...args) => {
      setLoading(true);
      const response = await getApi(...args);
      setNoSearch(response.data.photos.total === 0 ? true : false);
      setGalleries(response.data.photos.photo);
      setLoading(false);
    };

  const getImagesOfInterest = () => {
    if (loading) return null;
    setGalleryType(GalleryType.interest);
    getGalleries(getFlickrImagesOfInterest)();
  };
  const getImagesOfTags = () => {
    if (stringIsEmpty(searchText)) return null;
    if (loading) return null;
    setGalleryType(GalleryType.tags);
    getGalleries(getFlickrImagesOfTags)(searchText);
  };
  const getImagesOfUser = (userId) => {
    if (loading) return null;
    setGalleryType(
      userId === myUserId ? GalleryType.myGallery : GalleryType.tags
    );
    getGalleries(getFlickrImagesOfUser)(userId);
  };

  const searchEnter = (event) => {
    if (event.key === "Enter") {
      getImagesOfTags();
    }
  };

  useEffect(getImagesOfInterest, []);

  useEffect(() => {
    if (galleryType !== GalleryType.tags) resetSearch();
  }, [galleryType]);

  return (
    <>
      <Layout
        name={"Gallery"}
        backgroundImageUrl={`${$K.PUBLIC_URL}/img/Gallery.jpg`}
      >
        <nav>
          <div className="galleryType">
            <button
              className={`gallery-mode ${
                galleryType === GalleryType.interest ? "on" : ""
              }`}
              onClick={getImagesOfInterest}
            >
              Interest
            </button>
            <button
              className={`gallery-mode ${
                galleryType === GalleryType.myGallery ? "on" : ""
              }`}
              onClick={() => getImagesOfUser(myUserId)}
            >
              My Gallery
            </button>
          </div>
          <div className="searchBox">
            <Input
              type="text"
              name="searchText"
              data={searchText}
              setData={setSearch}
              keyUp={searchEnter}
              placeholder={"검색어를 입력하세요."}
            />
            <button onClick={getImagesOfTags}>검색</button>
          </div>
        </nav>

        <div className="frame">
          <Masonry
            elementType={"section"}
            options={{
              transitionDuration: ".5s",
            }}
          >
            {galleries?.map((gallery) => (
              <GalleryCard
                key={gallery.id}
                gallery={gallery}
                modal={modal}
                setSelectedImageUrl={setSelectedImageUrl}
                getImagesOfUser={getImagesOfUser}
              />
            ))}
          </Masonry>
          {noSearch && (
            <div
              style={{
                font: "normal 30px/1 'san-serif",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </Layout>
      <Modal ref={modal}>
        <img src={selectedImageUrl} alt="large picture" />
      </Modal>
      {loading && <Loading />}
    </>
  );
}

export default Gallery;

const defaultBuddyIcon = "https://www.flickr.com/images/buddyicon.gif";
const myUserId = "186014471@N03";

const GalleryCard = ({
  gallery,
  modal,
  setSelectedImageUrl,
  getImagesOfUser,
}) => {
  const { id, server, secret, title, farm, owner } = gallery;

  const middlePictureImageUrl = `https://live.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
  const bigPictureImageUrl = `https://live.staticflickr.com/${server}/${id}_${secret}_b.jpg`;
  const profileImageUrl = `https://farm${farm}.staticflickr.com/${server}/buddyicons/${owner}.jpg`;

  const openModal = () => {
    setSelectedImageUrl(bigPictureImageUrl);
    modal.current.openModal();
  };

  return (
    <article>
      <div className="inner">
        <div className="pic">
          <img src={middlePictureImageUrl} alt={title} onClick={openModal} />
        </div>
        <h2>{title}</h2>
        <div className="profile">
          <img
            src={profileImageUrl}
            alt={owner}
            onError={(e) => e.target.setAttribute("src", defaultBuddyIcon)}
          />
          <span onClick={() => getImagesOfUser(owner)}>{owner}</span>
        </div>
      </div>
    </article>
  );
};

const GalleryType = Object.freeze({
  interest: Symbol("interest"),
  myGallery: Symbol("myGallery"),
  tags: Symbol("tags"),
});
