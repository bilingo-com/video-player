import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DefaultPlayer } from '../../lib/index'; // eslint-disabled-line
import '../../lib/styles.css'; // eslint-disabled-line

// import { DefaultPlayer } from '../../src/index';
import poster from './assets/poster.png';
const sintelTrailer =
  'https://download.blender.org/durian/trailer/sintel_trailer-720p.mp4';

class App extends Component {
  render() {
    return (
      <div>
        <div style={{ height: 600 }}>
          <h2>HLS协议视频播放demo</h2>
          <DefaultPlayer
            style={{ width: '100%', height: 500 }}
            poster={poster}
            hls
            hlsUrl="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
          />
        </div>

        <div style={{ height: 600 }}>
          <h2>普通视频流协议播放demo</h2>
          <DefaultPlayer style={{ width: '100%', height: 500 }} poster={poster}>
            <source src={sintelTrailer} />
          </DefaultPlayer>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
