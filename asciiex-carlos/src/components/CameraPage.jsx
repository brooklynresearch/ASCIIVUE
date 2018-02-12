import React, { Component } from 'react';
import aalib from 'aalib.js';
import axios from 'axios';
import { debounce } from 'lodash';
// import wtLogo from '../assets/wt-logo.jpg';

const Arrow = () => {
	return(
		<svg className='reload' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
  		<path id='reload-arrow' fillRule="evenodd" d="M13.6 2.4C12.2.9 10.2 0 8 0 3.6 0 0 3.6 0 8s3.6 8 8 8c3.7 0 6.8-2.6 7.7-6h-2.1c-.8 2.3-3 4-5.6 4-3.3 0-6-2.7-6-6s2.7-6 6-6c1.7 0 3.1.7 4.2 1.8L9 7h7V0l-2.4 2.4z"/>
		</svg>
	)
};

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
		this.active = debounce(::this.active, 999999999999, { trailing: true }, );
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
		let initLineHeight = lineHeight;
		let initY = y;


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

			if((y - initY) / initLineHeight > 2) {
				alert('Quote Too long, retry!');
				this.setState({ quote: '' });
				return;
			}
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
			"visibility": this.state.seconds ? 'visible' : 'hidden'
		}

		return(
			<article className='camera-page'>
				<header className='camera-page-header'>
					<div id='wt-logo' onClick={this.props.history.goBack}>
						<img src='wt-logo.jpg'></img>
					</div>
	        <div id='retry-speech' onClick={() => {
	            this.active();
	            this.setState({quote: ''});
	            this.startSpeechRecognition();
	          }}>
						<div className='reload-arrow'>
							<Arrow/>
						</div>
					</div>
				</header>
				<section className='camera-page-canvas-container'>
					<video id="video" ref={ref => this.video = ref} width="640" height="480" controls></video>
					<div ref={ref => this.asciiContainer = ref} className="container-ascii-art">
						<canvas ref={ref => this.asciiCanvas = ref} id="ascii-canvas"></canvas>
						<canvas ref={ref => this.quoteCanvas = ref} id="quote-canvas" width='375px' height='560px'></canvas>
					</div>
				</section>
				<div className="snap">
					<div id="snapshot" onClick={this.handleSnapShot}>SNAP PHOTO</div>
				</div>
				<div className="countdown-overlay" style={countdownStyle}>
					<div className="countdown-overlay-timer">
						{this.state.seconds}
					</div>
				</div>
			</article>
		)
	}
}

export default CameraPage;