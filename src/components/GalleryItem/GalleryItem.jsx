import React from "react";
import PropTypes from "prop-types";
import styles from "./GalleryItem.module.css";

const GalleryItem = ({ image, onClick }) => (
  <li className={styles.ImageGalleryItem}>
    <img
      src={image.webformatURL}
      alt={image.tags}
      className={styles["ImageGalleryItem-image"]}
      onClick={onClick}
    />
  </li>
);

GalleryItem.defaultProps = {
  tags: "",
};

GalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }),
  onClick: PropTypes.func.isRequired,
};

export default GalleryItem;