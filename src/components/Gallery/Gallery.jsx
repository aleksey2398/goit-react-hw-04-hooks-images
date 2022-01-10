import React from "react";
import PropTypes from "prop-types";
import GalleryItem from "../GalleryItem";
import styles from "./Gallery.module.css";

const Gallery = ({ images, onClick }) => (
  <ul className={styles.ImageGallery}>
    {images.map((image, idx) => {
      return (
        <GalleryItem key={image.id + idx} image={image} onClick={()=>onClick(image.largeImageURL)}
        />
      );
    })}
  </ul>
);

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};

export default Gallery;