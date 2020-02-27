import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DefaultPlayer } from '../../lib/index'; // eslint-disabled-line
import '../../lib/styles.css'; // eslint-disabled-line

// import { DefaultPlayer } from '../../src/index';
import poster from './assets/poster.png';
const sintelTrailer =
  'https://download.blender.org/durian/trailer/sintel_trailer-720p.mp4';

class App extends Component {
  state = {
    hlsUrl: "https://links123-class.oss-cn-hangzhou.aliyuncs.com/record/2020222/acd71f894b4cda80fc3d94b5fa79c898_C177.m3u8",
  }
  hlsUrl = "https://links123-class.oss-cn-hangzhou.aliyuncs.com/record/2020222/acd71f894b4cda80fc3d94b5fa79c898_C177.m3u8";
  updateUrl = () => {
    this.setState({
      hlsUrl: 'https://links123-class.oss-cn-hangzhou.aliyuncs.com/record/2020214/85c5d593304f65f2f3467fab52895dd2_C187.m3u8',
    })
    console.log('hls', this.state.hlsUrl);
  }
  render() {
    return (
      <div>
        <div style={{ height: 600 }}>
          <h2>HLS协议视频播放demo</h2>
          <button onClick={() => {this.updateUrl();}}>切换播放源</button>
          <DefaultPlayer
            style={{ width: '100%', height: 500 }}
            poster={poster}
            hls
            hlsConfig={{}} //可选 refer hls.js
            hlsUrl={this.state.hlsUrl}
            autoPlay={false}
            loop={false}
            muted={false}
            controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
            x5-playsinline=""
            playsInline=""
            webkit-playsinline=""
          >
            <source src={this.state.hlsUrl} type="application/x-mpegURL" />
          </DefaultPlayer>
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
