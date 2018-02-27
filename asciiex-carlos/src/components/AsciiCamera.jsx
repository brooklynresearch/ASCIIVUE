import React, { Component } from 'react';
import aalib from 'aalib.js';
import logo from 'assets/wt-ada-ascii.jpg';

class AsciiCamera extends Component {
	constructor(props) {
		super(props);

		this.getWebCamera = ::this.getWebCamera;
		this.pauseCamera = ::this.pauseCamera;
		this.restartCamera = ::this.restartCamera;
		this.createAsciiFeed = ::this.createAsciiFeed;
	}

	createAsciiFeed() {
		let pixelRatio = window.devicePixelRatio;
		let { pixelWidth, pixelHeight, height, width } = this.props;

		this.videoStream = this.getWebCamera();

		aalib.read.video.fromVideoElement(this.video, { autoplay: true })
			.map(aalib.aa({ width: pixelWidth, height: pixelHeight }))
			.map(aalib.render.canvas({
				fontSize: 11 * pixelRatio,
				lineHeight: 11 * pixelRatio,
				charWidth: 6 * pixelRatio,
				height: height * pixelRatio,
				width: width * pixelRatio,
				el: this.asciiCanvas
			}))
			.subscribe();
	}

	componentDidMount() {
		this.createAsciiFeed();
	}

	componentWillUnmount() {
		// stop the video stream everytime a component unmounts. If not done will cause performance issues/ multiple instances of webcam.
		this.videoStream.then(stream => {
			stream.getTracks()[0].stop();
		})
	}

	pauseCamera() {
		this.video.pause();
	}
	restartCamera() {
		this.video.play()
	}

	getWebCamera() {
		if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			let webcam = navigator.mediaDevices.getUserMedia({
				video: {
					width: 480,
					height: 640,
					frameRate: 5
				}
			});
			webcam.then(stream => {
				this.video.src = window.URL.createObjectURL(stream);
			});
			return webcam;
		};
	}

	render() {
		let asciiCanvasStyle = { width: '100%', height: '100%' };

		return(
			<div className='wt-ascii-camera'>
        <video id="video" ref={ref => this.video = ref} width="480" height="640" controls/>
        <div className='wt-ascii-camera-container'>
          <canvas ref={ref => this.asciiCanvas = ref} id="ascii-canvas"/>
        </div>
      </div>)
	}
}

export default AsciiCamera;