/**
 * This is a HoC that finds a single
 * <video> in a component and makes
 * all its PROPERTIES available as props.
 */
import React, { Component, createRef } from 'react';
import { EVENTS, PROPERTIES, TRACKEVENTS } from './constants';

const defaultMapStateToProps = (state = {}) => ({
  video: {
    ...state,
  },
});

const defaultMapVideoElToProps = videoEl => ({
  videoEl,
});

const defaultMergeProps = (
  stateProps = {},
  videoElProps = {},
  ownProps = {},
) => ({ ...stateProps, ...videoElProps, ...ownProps });

export default (
  BaseComponent,
  mapStateToProps = defaultMapStateToProps,
  mapVideoElToProps = defaultMapVideoElToProps,
  mergeProps = defaultMergeProps,
) =>
  class Video extends Component {
    constructor(props) {
      super(props);
      this.updateState = this.updateState.bind(this);
      this.state = {
        videoEl: null,
      };
      this.el = createRef();
    }

    updateState() {
      this.setState(
        PROPERTIES.reduce((p, c) => {
          p[c] = this.videoEl && this.videoEl[c];
          if (c === 'playbackrates' && this.videoEl) {
            if (this.videoEl.dataset && this.videoEl.dataset[c]) {
              p[c] = JSON.parse(this.videoEl.dataset[c]);
            } else {
              p[c] = JSON.parse(this.videoEl.getAttribute(`data-${c}`));
            }
          }
          return p;
        }, {}),
      );
    }

    bindEventsToUpdateState() {
      EVENTS.forEach(event => {
        if (this.videoEl.addEventListener) {
          this.videoEl.addEventListener(event.toLowerCase(), this.updateState);
        } else {
          this.videoEl.attachEvent(
            `on${event.toLowerCase()}`,
            this.updateState,
          );
        }
      });

      TRACKEVENTS.forEach(event => {
        // TODO: JSDom does not have this method on
        // `textTracks`. Investigate so we can test this without this check.
        this.videoEl.textTracks &&
          this.videoEl.textTracks.addEventListener &&
          this.videoEl.textTracks.addEventListener(
            event.toLowerCase(),
            this.updateState,
          );
      });

      // If <source> elements are used instead of a src attribute then
      // errors for unsupported format do not bubble up to the <video>.
      // Do this manually by listening to the last <source> error event
      // to force an update.
      const sources = this.videoEl.getElementsByTagName('source');
      if (sources.length) {
        const lastSource = sources[sources.length - 1];
        lastSource.addEventListener
          ? lastSource.addEventListener('error', this.updateState)
          : lastSource.attachEvent('error', this.updateState);
      }
    }

    unbindEvents() {
      EVENTS.forEach(event => {
        this.videoEl.removeEventListener
          ? this.videoEl.removeEventListener(
              event.toLowerCase(),
              this.updateState,
            )
          : this.videoEl.detachEvent(
              `on${event.toLowerCase()}`,
              this.updateState,
            );
      });

      TRACKEVENTS.forEach(event => {
        // TODO: JSDom does not have this method on
        // `textTracks`. Investigate so we can test this without this check.
        this.videoEl.textTracks &&
          this.videoEl.textTracks.removeEventListener &&
          this.videoEl.textTracks.removeEventListener(
            event.toLowerCase(),
            this.updateState,
          );
      });

      const sources = this.videoEl.getElementsByTagName('source');
      if (sources.length) {
        const lastSource = sources[sources.length - 1];
        lastSource.removeEventListener
          ? lastSource.removeEventListener('error', this.updateState)
          : lastSource.detachEvent('onerror', this.updateState);
      }
    }

    componentWillUnmount() {
      this.unbindEvents();
    }

    componentDidMount() {
      this.videoEl = this.el.current.getElementsByTagName('video')[0];
      this.setState({
        videoEl: this.videoEl,
      });
      this.bindEventsToUpdateState();
    }

    render() {
      const stateProps = mapStateToProps(this.state, this.props);
      const videoElProps = mapVideoElToProps(
        this.state.videoEl,
        this.state,
        this.props,
      );
      return (
        <div style={{ height: '100%' }} ref={this.el}>
          <BaseComponent
            {...mergeProps(stateProps, videoElProps, this.props)}
          />
        </div>
      );
    }
  };
