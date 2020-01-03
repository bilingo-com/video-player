import React from 'react';
import styles from './Speed.css';
import SpeedIcon from '../Icon/speed.svg';

export default ({
  playbackrates,
  onClick,
  onItemClick,
  className,
  ariaLabel,
}) => {
  // console.log('speed')
  return (
    <div className={[styles.component, className].join(' ')}>
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        className={styles.button}
      >
        <SpeedIcon className={styles.icon} fill="#fff" />
      </button>
      <ul className={styles.speedList}>
        {playbackrates &&
          playbackrates.map(rate => (
            <li
              key={rate.id}
              className={
                rate.mode === 'showing'
                  ? styles.activeSpeedItem
                  : styles.speedItem
              }
              onClick={onItemClick.bind(this, rate)}
            >
              {rate.name}
            </li>
          ))}
      </ul>
    </div>
  );
};
