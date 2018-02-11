import React, { Component } from 'react';
import aalib from 'aalib.js';
import axios from 'axios';
import { debounce } from 'lodash';

class CameraPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			seconds: 5,
			quote: ""
		}
		this.MAX_TEXT_WIDTH = 360;

		this.startCountDown = ::this.startCountDown;
		this.handleSnapShot = ::this.handleSnapShot;
		this.startSpeechRecognition = ::this.startSpeechRecognition;
		this.active = debounce(::this.active, 120000, { trailing: true }, );
	}

	openWebCam() {
		if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
				this.video.src = window.URL.createObjectURL(stream);
			});
		};
	}

	componentDidMount() {
		this.active();

		this.startCountDown(this.startSpeechRecognition, 5);

		this.openWebCam();

		aalib.read.video.fromVideoElement(this.video, { autoplay: true })
			.map(aalib.aa({ width: 73, height: 100 }))
			.map(aalib.render.canvas({
				fontSize: 10,
				height: 510,
				width: 375,
				el: this.asciiCanvas
			}))
			.subscribe();
	}

	componentDidUpdate() {
		this.updateQuoteCanvas();
	}

	active() {
		this.props.history.replace('/');
	}

	updateQuoteCanvas() {
		let ctx = this.quoteCanvas.getContext('2d');
		let { width, height } = this.quoteCanvas;
		ctx.clearRect(0, 0, width, height);
		ctx.textAlign = "center";
		ctx.font = '12px verdana';
		this.wrapText(ctx, this.state.quote, width / 2, height - 35, this.MAX_TEXT_WIDTH, 20);

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

	capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	wrapText(ctx, text, x, y, maxWidth, lineHeight) {
		let lines = text.split("\n");

		for(let i = 0; i < lines.length; i++) {

			let words = lines[i].split(' ');
			let line = '';

			for(let n = 0; n < words.length; n++) {
				let testLine = line + words[n] + ' ';
				let metrics = ctx.measureText(testLine);
				let testWidth = metrics.width;
				if(testWidth > maxWidth && n > 0) {
					ctx.fillText(line, x, y);
					line = words[n] + ' ';
					y += lineHeight;
				} else {
					line = testLine;
				}
			}

			ctx.fillText(line, x, y);
			y += lineHeight;
		}
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
			let quote = event.results[event.results.length - 1][0].transcript;
			quote = `\"${this.capitalize(quote)}.\"`;
			this.setState({ quote });
		}

		recognition.start();
	}

	handleSnapShot(e) {
		e.preventDefault();

		let ctx = this.quoteCanvas.getContext('2d');
		ctx.drawImage(this.asciiCanvas, 0, 0, 375, 510);

		let dataURL = this.quoteCanvas.toDataURL("image/png");
		axios.post('/save-image', { dataURL }).then(() => alert('saved successfully'));
		ctx.clearRect(0, 0, 375, 510);
	}

	render() {
		let countdownStyle = {
			visibility: this.state.seconds ? 'visible' : 'hidden'
		}

		return(
			<div className='camera-page'>
        <div onClick={this.props.back}>back</div>
				<div>FUCK YOU I CHANGED IT!!!!</div>
        <div id='retry-speech' onClick={() => {
            this.active();
            this.setState({quote: ''});
            this.startSpeechRecognition();
          }}>retry</div>
				<video id="video" ref={ref => this.video = ref} width="640" height="480" controls></video>
				<div ref={ref => this.asciiContainer = ref} className="container-ascii-art">
					<canvas ref={ref => this.asciiCanvas = ref} id="ascii-canvas"></canvas>
					<canvas ref={ref => this.quoteCanvas = ref} id="quote-canvas" width='375px' height='560px'></canvas>
				</div>
				<button id="snap" onClick={this.handleSnapShot}>Snap Photo</button>
				<div style={countdownStyle}>{this.state.seconds}</div>
			</div>
		)
	}
}

export default CameraPage;