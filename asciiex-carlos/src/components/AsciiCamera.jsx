import React, { Component } from 'react';
import aalib from 'aalib.js';

class AsciiCamera extends Component {
	constructor(props) {
		super(props);

		this.getWebCamera = ::this.getWebCamera;
	}

	componentDidMount() {

		this.getWebCamera();

		aalib.read.video.fromVideoElement(this.video, { autoplay: true })
			.map(aalib.aa({ width: 73, height: 95 }))
			.map(aalib.render.canvas({
				background: 'rgba(0,0,0,0)',
				fontSize: 10,
				lineHeight: 10,
				height: 510,
				width: 375,
				el: this.asciiCanvas
			}))
			.subscribe();
	}

	getWebCamera() {
		if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
				this.video.src = window.URL.createObjectURL(stream);
			});
		};
	}

	render() {
		return(
			<div className='wt-ascii-camera'>
        <video id="video" ref={ref => this.video = ref} width="640" height="480" controls/>
        <div className='wt-ascii-camera-container'>
          <canvas ref={ref => this.asciiCanvas = ref} id="ascii-canvas"/>
        </div>

      </div>)
	}
}

export default AsciiCamera;