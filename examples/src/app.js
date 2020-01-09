import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DefaultPlayer from '../../lib/index'; // eslint-disabled-line
import '../../lib/styles.css'; // eslint-disabled-line
import poster from './assets/1.png';
const sintelTrailer =
  'https://download.blender.org/durian/trailer/sintel_trailer-720p.mp4';

class App extends Component {
  render() {
    return (
      <div>
        {/* <Fullscreen onClick={() => {}} onScreenClickCallback={() => {}} /> */}
        <DefaultPlayer
          ref="video2"
          style={{ width: '100%', height: 500 }}
          poster={poster}
          data-playbackrates={JSON.stringify([
            {
              id: 0.5,
              name: '0.5x',
              mode: 'disabled',
            },
            {
              id: 0.75,
              name: '0.75x',
              mode: 'disabled',
            },
            {
              id: 1,
              name: 'Normal',
              mode: 'showing',
            },
            {
              id: 1.25,
              name: '1.25x',
              mode: 'disabled',
            },
            {
              id: 1.5,
              name: '1.5x',
              mode: 'disabled',
            },
            {
              id: 2,
              name: '2x',
              mode: 'disabled',
            },
          ])}
          //   poster={bigBuckBunnyPoster}
        >
          <source src={sintelTrailer} type="video/mp4" />
        </DefaultPlayer>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
