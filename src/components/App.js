import React, { useState, useEffect } from "react";
import Gallery from "./Gallery/Gallery";
import SearchBar from "./SearchBar/SearchBar";
import Modal from "./Modal/Modal";
import Button from "./Button/Button";
import { Api } from "../Api/Api";
import "../../src/App.css";
import styles from "../components/Modal/Modal.module.css";
import Loader from "react-loader-spinner";


function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('searchQuery :>> ', searchQuery);
    console.log('currentPage :>> ', currentPage);
    if (!searchQuery) return;
    console.log("after if");
    const onSearch = async () => {
      setIsLoading(true);
      try {
        const data = await Api.fetchImages({searchQuery, currentPage});
        //if(data?.hits.length < 11){return null;}
        console.log("object", data);
        
        if (!data.hits.length) {
          throw new Error("Sorry we can't find anything");
       
        }
        if (data?.hits.length > 11) {
          setImages(prevImages => [...prevImages, ...data.hits]);
          console.log(data);
          setIsLoading(false);
        }
        //setCurrentPage((prevPage) => prevPage + 1);

      } catch (error) {
        setError(error.message);
         console.log(error);
        // const result = await Api.fetchImages(currentPage, searchQuery);
        // console.log(result)

      } finally {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
        setIsLoading(false);
      }
    };
    console.log("after Fn");
    onSearch();
  }, [searchQuery, currentPage]);


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getLargeUrl = (url) => {
    setLargeImageURL(url);
    setIsModalOpen(true);
  };

  const onFormSubmit = (item) => {
    setSearchQuery(item);
    setImages([]);
    setCurrentPage(1);
  };

  const onLoadMore = () => {
    setIsLoading(true);
    setCurrentPage((prevPage) => prevPage + 1);
  }

  //render() {
  //const { isModalOpen, images, largeImageURL, isLoading } = this.state;
  //console.log(this.state.searchQuery)

  return (
    <div className="App">
      <SearchBar onSubmit={onFormSubmit} />
      {error && <p>{error.message}</p>}
      <Gallery images={images} onClick={getLargeUrl} />
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <img className={styles.Modal} src={largeImageURL} alt="" />
        </Modal>
      )}
      {isLoading && <Loader />}
      {images.length >= 12 && !isLoading &&
        <Button onClick={onLoadMore} />
      }
    </div>
  );
}

export default App;