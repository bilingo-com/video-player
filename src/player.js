import React from 'react';
import PropTypes from 'prop-types';
import videoConnect from './utils/video';
import copy from './utils/copy';
import {
  setVolume,
  showTrack,
  showSpeed,
  toggleTracks,
  toggleSpeeds,
  toggleMute,
  togglePause,
  setCurrentTime,
  toggleFullscreen,
  getPercentagePlayed,
  getPercentageBuffered,
  togglePictureInPicture,
} from './utils/api';
import styles from './player.css';
import Time from './components/Time/Time';
import Seek from './components/Seek/Seek';
import Volume from './components/Volume/Volume';
import Captions from './components/Captions/Captions';
import Speed from './components/Speed/Speed';
import PlayPause from './components/PlayPause/PlayPause';
import Fullscreen from './components/Fullscreen/Fullscreen';
import Overlay from './components/Overlay/Overlay';
import PictureInPicture from './components/PictureInPicture/PictureInPicture';

const DefaultPlayer = ({
  copy,
  video,
  style,
  controls,
  children,
  className,
  onSeekChange,
  onVolumeChange,
  onVolumeClick,
  onCaptionsClick,
  onSpeedClick,
  onPlayPauseClick,
  onFullscreenClick,
  onCaptionsItemClick,
  onSpeedsItemClick,
  onPictureInPictureClick,
  ...restProps
}) => {
  let playbackrates = restProps['data-playbackrates'];
  if (playbackrates) {
    playbackrates = JSON.parse(playbackrates);
  }
  const { onScreenClickCallback, onPictureInPictureClickCallback } = restProps;
  return (
    <div className={[styles.component, className].join(' ')} style={style}>
      <video
        className={styles.video}
        {...restProps}
        playsInline={true}
        wekit-playsinline="true"
      >
        {children}
      </video>
      <Overlay onClick={onPlayPauseClick} {...video} />
      {controls && controls.length && !video.error && (
        <div className={styles.controls}>
          {controls.map((control, i) => {
            switch (control) {
              case 'PlayPause':
                return (
                  <PlayPause
                    key={i}
                    ariaLabelPlay={copy.play}
                    ariaLabelPause={copy.pause}
                    onClick={onPlayPauseClick}
                    {...video}
                  />
                );
              case 'Seek':
                return (
                  <Seek
                    key={i}
                    ariaLabel={copy.seek}
                    className={styles.seek}
                    onChange={onSeekChange}
                    {...video}
                  />
                );
              case 'Time':
                return <Time key={i} {...video} />;
              case 'Speed':
                return playbackrates && playbackrates.length > 0 ? (
                  <Speed
                    key={i}
                    onClick={onSpeedClick}
                    ariaLabel={copy.captions}
                    onItemClick={onSpeedsItemClick}
                    playbackrates={playbackrates}
                    {...video}
                  />
                ) : null;

              case 'Volume':
                return (
                  <Volume
                    key={i}
                    onClick={onVolumeClick}
                    onChange={onVolumeChange}
                    ariaLabelMute={copy.mute}
                    ariaLabelUnmute={copy.unmute}
                    ariaLabelVolume={copy.volume}
                    {...video}
                  />
                );
              case 'Captions':
                return video.textTracks && video.textTracks.length ? (
                  <Captions
                    key={i}
                    onClick={onCaptionsClick}
                    ariaLabel={copy.captions}
                    onItemClick={onCaptionsItemClick}
                    {...video}
                  />
                ) : null;

              case 'PictureInPicture':
                return (
                  <PictureInPicture
                    key={i}
                    ariaLabel={copy.fullscreen}
                    onClick={onPictureInPictureClick}
                    onPictureInPictureClickCallback={
                      onPictureInPictureClickCallback
                    }
                    {...video}
                  />
                );
              case 'Fullscreen':
                return (
                  <Fullscreen
                    key={i}
                    ariaLabel={copy.fullscreen}
                    onClick={onFullscreenClick}
                    onScreenClickCallback={onScreenClickCallback}
                    {...video}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
      )}
    </div>
  );
};

const controls = [
  'PlayPause',
  'Seek',
  'Time',
  'Volume',
  'Speed',
  'PictureInPicture',
  'Fullscreen',
  'Captions',
];

DefaultPlayer.defaultProps = {
  copy,
  controls,
  video: {},
};

DefaultPlayer.propTypes = {
  copy: PropTypes.object.isRequired,
  controls: PropTypes.arrayOf(PropTypes.oneOf(controls)),
  video: PropTypes.object.isRequired,
};

const connectedPlayer = videoConnect(
  DefaultPlayer,
  ({ networkState, readyState, error, ...restState }) => ({
    video: {
      readyState,
      networkState,
      error: error || (readyState > 0 && networkState === 3),
      // TODO: This is not pretty. Doing device detection to remove
      // spinner on iOS devices for a quick and dirty win. We should see if
      // we can use the same readyState check safely across all browsers.
      loading:
        readyState < (/iPad|iPhone|iPod/.test(navigator.userAgent) ? 1 : 4),
      percentagePlayed: getPercentagePlayed(restState),
      percentageBuffered: getPercentageBuffered(restState),
      ...restState,
    },
  }),
  (videoEl, state) => ({
    onPictureInPictureClick: () => togglePictureInPicture(videoEl),
    onFullscreenClick: () => toggleFullscreen(videoEl),
    onVolumeClick: () => toggleMute(videoEl, state),
    onCaptionsClick: () => toggleTracks(state),
    onSpeedClick: () => toggleSpeeds(videoEl, state),
    onPlayPauseClick: () => togglePause(videoEl, state),
    onCaptionsItemClick: track => showTrack(state, track),
    onSpeedsItemClick: speed => showSpeed(videoEl, state, speed),
    onVolumeChange: e => setVolume(videoEl, state, e.target.value),
    onSeekChange: e =>
      setCurrentTime(videoEl, state, (e.target.value * state.duration) / 100),
  }),
);

export default connectedPlayer;

export { Time, Seek, Volume, Captions, PlayPause, Fullscreen, Overlay };
