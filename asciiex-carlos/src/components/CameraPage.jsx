import React, { Component } from 'react';
import aalib from 'aalib.js';
import axios from 'axios';

class CameraPage extends Component {
	constructor(props) {
		super(props);

		this.canvas = null;
		this.state = {
			quote: ""
		}

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
		let SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
		let SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
		let SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

		let recognition = new SpeechRecognition();
		let speechRecognitionList = new SpeechGrammarList();
		recognition.continuous = true;
		recognition.lang = 'en-US';
		recognition.interimResults = true;
		recognition.maxAlternatives = 1;
		recognition.start();

		recognition.onresult = (event) => {
			var word = event.results[0][0].transcript;
			this.setState({ quote: word });
			console.log(word);
		}

		axios.post('/save-image', { dataURL }).then(() => alert('saved successfully'));
	}

	render() {
		return(
			<div className='camera-page'>
        <div>{this.state.quote}</div>
				<video id="video" width="640" height="480" controls></video>
				<button id="snap" onClick={this.handleSnapShot}>Snap Photo</button>
				<canvas id="canvas" width="640" height="480"></canvas>
			</div>
		)
	}
}

export default CameraPage;