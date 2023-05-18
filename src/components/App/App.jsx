import { useState, useEffect } from "react";
import { Audio } from 'react-loader-spinner';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import imagesAPI from '../services/images-api';
import Modal from '../Modal/Modal'

export const App = () => {
  const [imgName, setImgName] = useState('');
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [id, setId] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loadMore, setLoadMore] = useState(null);

  useEffect(() => {
    if (!imgName) {
      return;
    }
    setLoading(true);

    const fetchGallery = async () => {
      try {
      const response = await imagesAPI.fetchImages(pageNumber, imgName);
      const totalHits = response.data.totalHits;
      const fetchedImages = response.data.hits;
      const isCollectionFinished = pageNumber < Math.ceil(totalHits / 12)
      setImages((prevState) => [...prevState, ...fetchedImages])
      setLoadMore(isCollectionFinished);
      setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
 
    fetchGallery();
  }, [ imgName, pageNumber]);

  const onLoadMore = () => {
    setPageNumber((prevValue) => {
      return prevValue + 1
    })
  }

  const toggleModal = () => {
    setShowModal((prevValue) => !prevValue)
  }

  const formSubmitHendler = (name) => {
    setImgName(name);
    setPageNumber(1);
    setImages([]);
    setLoadMore(null);
  }

  const openModal = (id, largeImageURL) => {
    setId(id);
    setLargeImageURL(largeImageURL)
    toggleModal();
  }

    return (
      <div>
      <Searchbar onSubmit={formSubmitHendler}/>
      {isLoading && <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
      />}
      <ImageGallery images={images} onClick={openModal}/>
      {showModal && (<Modal onClose={toggleModal}><img src={largeImageURL} alt={id} width="600"/></Modal>)}
      {loadMore? <Button onClick={onLoadMore}/> : ''}
      </div>
    );
  }

