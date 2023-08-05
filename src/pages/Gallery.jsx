import React, { memo, useEffect, useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import $K from "../modules/data/Constants";
import { getFlickrImagesOfInterest } from "../modules/api/Gallery";
import Modal from "../components/layout/Modal";
import Masonry from "react-masonry-component";

function Gallery() {
  const [galleries, setGalleries] = useState();
  const [selectedImageUrl, setSelectedImageUrl] = useState();
  const modal = useRef(null);

  const getInterest = async () => {
    const response = await getFlickrImagesOfInterest();
    setGalleries(response.data.photos.photo);
  };

  useEffect(getInterest, []);

  return (
    <>
      <Layout
        name={"Gallery"}
        backgroundImageUrl={`${$K.PUBLIC_URL}/img/Gallery.jpg`}
      >
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
                {...gallery}
                modal={modal}
                setSelectedImageUrl={setSelectedImageUrl}
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

const GalleryCard = memo((photo, modal, setSelectedImageUrl) => {
  const { id, server, secret, title, farm, owner } = photo;

  const middlePictureImageUrl = `https://live.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
  const bigPictureImageUrl = `https://live.staticflickr.com/${server}/${id}_${secret}_b.jpg`;
  const profileImageUrl = `https://farm${farm}.staticflickr.com/${server}/buddyicons/${owner}.jpg`;

  const openModal = () => {
    console.log("open modal");
    modal.current.openModal();
  };

  const searchByUser = () => {
    console.log("search by user");
    setSelectedImageUrl(bigPictureImageUrl);
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
          <span onClick={searchByUser}>{owner}</span>
        </div>
      </div>
    </article>
  );
});
