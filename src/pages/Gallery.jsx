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

function Gallery() {
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
      const response = await getApi(...args);
      setGalleries(response.data.photos.photo);
    };

  const getImagesOfInterest = () => {
    setGalleryType(GalleryType.interest);
    getGalleries(getFlickrImagesOfInterest)();
  };
  const getImagesOfTags = () => {
    if (stringIsEmpty(searchText)) return null;
    setGalleryType(GalleryType.tags);
    getGalleries(getFlickrImagesOfTags)(searchText);
  };
  const getImagesOfUser = (userId) => {
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
        </div>
      </Layout>
      <Modal ref={modal}>
        <img src={selectedImageUrl} alt="large picture" />
      </Modal>
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
