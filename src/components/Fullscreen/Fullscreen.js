import React from 'react';
import styles from './Fullscreen.css';
import FullscreenIcon from '../Icon/fullscreen.svg';

export default ({ onClick, className, ariaLabel, onScreenClickCallback }) => {
  return (
    <div className={[styles.component, className].join(' ')}>
      <button
        type="button"
        onClick={onClick.bind(this, onScreenClickCallback)}
        aria-label={ariaLabel}
        className={styles.button}
      >
        <FullscreenIcon fill="#fff" className={styles.icon} />
      </button>
    </div>
  );
};
