import { Component } from 'react';

import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import imagesApi from '../../apiService/apiService';
import Modal from '../Modal/Modal';
import Loader from 'react-loader-spinner';

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    status: 'idle',
    showModal: false,
    largeImg: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName) {
      this.setState({ status: 'pending' });

      imagesApi
        .fetchImg(nextName)
        .then(images => {
          if (images.totalHits === 0) {
            return Promise.reject(
              new Error(`По поиску ${nextName} ничего не найдено`),
            );
          }
          window.scrollTo({ top: 0 });
          return this.setState({
            images: [...images.hits],
            page: 1,
            status: 'resolved',
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevPage !== nextPage && nextPage !== 1) {
      this.setState({ status: 'pending' });

      imagesApi
        .fetchImg(nextName, nextPage)
        .then(images => {
          return this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
            status: 'resolved',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(res => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        });
    }
  }

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleClickImg = largeImg => {
    this.setState({ largeImg: largeImg });
    this.toggleModal();
  };

  render() {
    const { images, error, status, showModal, largeImg } = this.state;
    return (
      <div className={s.ImageGallery__section}>
        {status === 'idle' && <p>Заполните поле</p>}
        <ul className={s.ImageGallery}>
          {images &&
            images.map(image => (
              <ImageGalleryItem
                key={image.id}
                image={image}
                onClick={() => {
                  this.handleClickImg(image.largeImageURL);
                }}
              />
            ))}
        </ul>
        {status === 'rejected' && <h1>{error.message}</h1>}
        {status === 'pending' && <Loader type="TailSpin" color="#00BFFF" />}
        {(images.length > 0 || status === 'resolved') && (
          <Button onLoadMore={this.loadMore} />
        )}
        {showModal && (
          <Modal onToggleModal={this.toggleModal}>
            <img src={largeImg} alt={images.tags} />
          </Modal>
        )}
      </div>
    );
  }
}
