import React, { Component } from 'react';
import aalib from 'aalib.js';
import axios from 'axios';
import { debounce } from 'lodash';

class CameraPage extends Component {
	constructor(props) {
		super(props);

		this.canvas = null;
		this.state = {
			seconds: 5,
			quote: ""
		}

		this.startCountDown = ::this.startCountDown;
		this.handleSnapShot = ::this.handleSnapShot;
		this.startSpeechRecognition = ::this.startSpeechRecognition;
		this.active = debounce(::this.active, 120000, { trailing: true }, );
	}

	componentDidMount() {
		this.active();
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

		this.startCountDown(this.startSpeechRecognition, 5);

		if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
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

	active() {
		this.props.history.replace('/');
	}

	startCountDown(endCallBack, seconds) {
		let interval = setInterval(() => {
			seconds--

			// Display 'counter' wherever you want to display it.
			if(seconds == 0) {
				// Display a login box
				clearInterval(interval);
				endCallBack();
			}
			this.setState({ seconds });
		}, 1000);
	}

	startSpeechRecognition() {
		let SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
		let SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
		let SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

		let recognition = new SpeechRecognition();

		recognition.continuous = true;
		recognition.lang = 'en-US';
		recognition.interimResults = true;
		recognition.maxAlternatives = 1;

		recognition.onresult = (event) => {
			var word = event.results[0][0].transcript;
			this.setState({ quote: word });
		}

		recognition.start();
	}

	handleSnapShot(e) {
		e.preventDefault();
		let dataURL = canvas.toDataURL("image/png");
		axios.post('/save-image', { dataURL }).then(() => alert('saved successfully'));
	}

	render() {
		let countdownStyle = {
			visibility: this.state.seconds ? 'visible' : 'hidden'
		}

		return(
			<div className='camera-page'>
        <div onClick={this.props.back}>back</div>
        <div id='retry-speech' onClick={() => {
            this.active();
            this.setState({quote: ''});
            this.startSpeechRecognition();
          }}>retry</div>
        <div style={countdownStyle}>{this.state.seconds}</div>
        <div>{this.state.quote}</div>
				<video id="video" width="640" height="480" controls></video>
				<button id="snap" onClick={this.handleSnapShot}>Snap Photo</button>
				<canvas id="canvas" width="640" height="480"></canvas>
			</div>
		)
	}
}

export default CameraPage;