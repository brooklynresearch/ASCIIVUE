import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import aalib from 'aalib.js';

class Container extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let video = document.getElementById('video'),
			canvas = document.getElementById('canvas'),
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
				// video.play();
			});
		}

		aalib.read.video.fromVideoElement(document.querySelector("video"), { autoplay: true })
			.map(aalib.aa({ width: 120, height: 150 }))
			.map(aalib.render.canvas({
				width: screen.width,
				height: screen.height,
				el: canvas
			}))
			.subscribe();
	}

	render() {
		return(
			<div>
				<video id="video" width="640" height="480" controls></video>
				<button id="snap">Snap Photo</button>
				<canvas id="canvas" width="640" height="480"></canvas>
			</div>
		)
	}
}

export default Container;