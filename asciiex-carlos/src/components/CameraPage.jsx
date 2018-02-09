import React, { Component } from 'react';
import aalib from 'aalib.js';
import axios from 'axios';

class CameraPage extends Component {
	constructor(props) {
		super(props);

		this.canvas = null;

		this.handleSnapShot = ::this.handleSnapShot;
	}

	componentDidMount() {
		this.canvas = document.getElementById('canvas');
		let video = document.getElementById('video'),
			canvasOptions = {
				fontSize: 10,
				lineHeight: 10,
				charWidth: 4.2,
				width: 400,
				height: 400,
				el: canvas,
				background: '#FFF',
				color: '#000'
			}

		// Get access to the camera!
		if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			// Not adding `{ audio: true }` since we only want video now
			navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
				video.src = window.URL.createObjectURL(stream);
			});
		}

		aalib.read.video.fromVideoElement(document.querySelector("video"), { autoplay: true })
			.map(aalib.aa({ width: 120, height: 150 }))
			.map(aalib.render.canvas({
				width: screen.width - 50,
				height: screen.height - 100,
				el: this.canvas
			}))
			.subscribe();
	}

	handleSnapShot(e) {
		e.preventDefault();
		let dataURL = canvas.toDataURL("image/png");

		axios.post('/save-image', { dataURL }).then(() => alert('saved successfully'));
	}

	render() {
		return(
			<div className='camera-page'>
				<video id="video" width="640" height="480" controls></video>
				<button id="snap" onClick={this.handleSnapShot}>Snap Photo</button>
				<canvas id="canvas" width="640" height="480"></canvas>
			</div>
		)
	}
}

export default CameraPage;