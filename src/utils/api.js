/**
 * These are custom helper methods that are not native
 * to the HTMLMediaElement API. Pass in the native
 * Video element, state and optional desired value to
 * set. To be primarily used in `mapVideoElToProps`.
 */
export const togglePause = (videoEl, { paused }) => {
  const videoTitleEl = document.getElementById('videoTitle');

  paused ? videoEl.play() : videoEl.pause();

  if (videoTitleEl) {
    videoTitleEl.style.display = paused ? 'none' : '';
  }
};

export const setCurrentTime = (videoEl, state, value) => {
  videoEl.currentTime = value;
};

export const setVolume = (videoEl, state, value) => {
  videoEl.muted = false;
  videoEl.volume = value;
};

export const mute = videoEl => {
  videoEl.muted = true;
};

export const unmute = videoEl => {
  videoEl.muted = false;
};

export const toggleMute = (videoEl, { volume, muted }) => {
  if (muted || volume <= 0) {
    if (volume <= 0) {
      videoEl.volume = 1;
    }
    videoEl.muted = false;
  } else {
    videoEl.muted = true;
  }
};

export const toggleFullscreen = (videoEl, callback) => {
  videoEl.requestFullScreen =
    videoEl.requestFullscreen ||
    videoEl.msRequestFullscreen ||
    videoEl.mozRequestFullScreen ||
    videoEl.webkitRequestFullscreen;
  document.exitFullscreen =
    document.exitFullscreen ||
    document.msExitFullscreen ||
    document.mozCancelFullScreen ||
    document.webkitExitFullscreen;
  const fullscreenElement =
    document.fullscreenElement ||
    document.msFullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement;
  if (fullscreenElement === videoEl) {
    document.querySelector('video').style.maxHeight = '100%';
    window.fullscreen = false;
    document.exitFullscreen();
  } else {
    document.querySelector('video').style.maxHeight = '100%';
    window.fullscreen = true;
    videoEl.requestFullScreen();
  }
};

export const showTrack = ({ textTracks }, track) => {
  hideTracks({ textTracks });
  track.mode = track.SHOWING || 'showing';
};

export const hideTracks = ({ textTracks }) => {
  for (let i = 0; i < textTracks.length; i++) {
    textTracks[i].mode = textTracks[i].DISABLED || 'disabled';
  }
};

export const toggleTracks = (() => {
  let previousTrack;
  return ({ textTracks }) => {
    const currentTrack = [...textTracks].filter(
      track => track.mode === track.SHOWING || track.mode === 'showing',
    )[0];
    if (currentTrack) {
      hideTracks({ textTracks });
      previousTrack = currentTrack;
    } else {
      showTrack({ textTracks }, previousTrack || textTracks[0]);
    }
  };
})();

export const showSpeed = (videoEl, state, speed) => {
  const { playbackrates } = state;
  hideSpeeds(videoEl, { playbackrates });
  speed.mode = speed.SHOWING || 'showing';
  if (videoEl.dataset) {
    videoEl.dataset.playbackrates = JSON.stringify(playbackrates);
  } else {
    videoEl.setAttribute('data-playbackrates', JSON.stringify(playbackrates));
  }
  videoEl.playbackRate = speed.id;
};

export const hideSpeeds = (videoEl, state) => {
  const { playbackrates } = state;
  for (let i = 0; i < playbackrates.length; i++) {
    playbackrates[i].mode = playbackrates[i].DISABLED || 'disabled';
  }
};

export const toggleSpeeds = (() => {
  let previousSpeed;
  return (videoEl, state) => {
    const { playbackrates } = state;

    const currentSpeed = playbackrates.filter(
      item => item.mode === 'showing',
    )[0];

    if (currentSpeed) {
      hideSpeeds(videoEl, { playbackrates });
      previousSpeed = currentSpeed;
    } else {
      showSpeed(videoEl, { playbackrates }, previousSpeed || playbackrates[0]);
    }
  };
})();

/**
 * Custom getter methods that are commonly used
 * across video layouts. To be primarily used in
 * `mapStateToProps`
 */
export const getPercentageBuffered = ({ buffered, duration }) =>
  (buffered &&
    buffered.length &&
    (buffered.end(buffered.length - 1) / duration) * 100) ||
  0;

export const getPercentagePlayed = ({ currentTime, duration }) =>
  (currentTime / duration) * 100;
