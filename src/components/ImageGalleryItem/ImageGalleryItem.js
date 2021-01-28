import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ image, onClick }) {
  return (
    <li className={s.ImageGalleryItem} onClick={onClick}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className={s.ImageGalleryItem__image}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func,
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
