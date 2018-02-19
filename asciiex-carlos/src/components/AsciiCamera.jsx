import React, { Component } from 'react';
import aalib from 'aalib.js';

class AsciiCamera extends Component {
	constructor(props) {
		super(props);

		this.getWebCamera = ::this.getWebCamera;
		this.pauseCamera = ::this.pauseCamera;
		this.restartCamera = ::this.restartCamera;
	}

	componentDidMount() {
		let pixelRatio = window.devicePixelRatio;
		let { pixelWidth, pixelHeight, height, width } = this.props;

		this.videoStream = this.getWebCamera();

		aalib.read.video.fromVideoElement(this.video, { autoplay: true })
			.map(aalib.aa({ width: pixelWidth, height: pixelHeight }))
			.map(aalib.render.canvas({
				background: 'rgba(0,0,0,0)',
				fontSize: 10 * pixelRatio,
				lineHeight: 10 * pixelRatio,
				height: height * pixelRatio,
				width: width * pixelRatio,
				el: this.asciiCanvas
			}))
			.subscribe();
	}

	componentWillUnmount() {
		// stop the video stream everytime a component unmounts. If not done will cause performance issues/ multiple instances of webcam.
		this.videoStream.then(stream => {
			console.log(stream.getTracks()[0])
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
					width: 73,
					height: 95,
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
		let asciiCanvasStyle = { width: '100%', height: '100%' }
		return(
			<div className='wt-ascii-camera'>
        <video id="video" ref={ref => this.video = ref} width="640" height="480" controls/>
        <div className='wt-ascii-camera-container'>
          <canvas style={asciiCanvasStyle} ref={ref => this.asciiCanvas = ref} id="ascii-canvas"/>
        </div>

      </div>)
	}
}

export default AsciiCamera;