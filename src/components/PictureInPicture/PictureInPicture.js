import React from 'react';
import styles from './PictureInPicture.css';
import PictureInPictureIcon from '../Icon/picture_in_picture.svg';

export default ({
  onClick,
  className,
  ariaLabel,
  onPictureInPictureClickCallback,
}) => {
  return (
    <div className={[styles.component, className].join(' ')}>
      <button
        type="button"
        onClick={onClick.bind(this, onPictureInPictureClickCallback)}
        aria-label={ariaLabel}
        className={styles.button}
      >
        <PictureInPictureIcon fill="#fff" className={styles.icon} />
      </button>
    </div>
  );
};
