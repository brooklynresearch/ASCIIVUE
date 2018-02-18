import React, { Component } from 'react';
import InputPartial from 'InputPartial';
import Retake from 'Retake';
import { withRouter } from 'react-router-dom';

class AsciiQuote extends Component {
	constructor(props) {
		super(props);

		this.state = {
			quote: '',
			speechState: 'default'
		}

		this.startSpeechRecognition = ::this.startSpeechRecognition;
		this.updateQuoteCanvas = ::this.updateQuoteCanvas;
		this.wrapText = ::this.wrapText;
		this.capitalize = ::this.capitalize;
		this.handleMicrophoneClick = ::this.handleMicrophoneClick;
		this.renderUserInputStates = ::this.renderUserInputStates;
		this.handleConfirm = ::this.handleConfirm;
		this.handleRetake = ::this.handleRetake;
		this.renderRetake = ::this.renderRetake;
		this.abortSpeechRecognition = ::this.abortSpeechRecognition;

	}

	componentDidUpdate(prevProps, prevState) {
		// only update if quoting has begun and continues.
		if(this.state.quote !== prevState.quote) {
			this.updateQuoteCanvas();
		}
	}

	componentDidMount() {}


	startSpeechRecognition() {
		let SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
		let SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
		let SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

		this.recognition = new SpeechRecognition();

		this.recognition.continuous = true;
		this.recognition.lang = 'en-US';
		this.recognition.interimResults = true;
		this.recognition.maxAlternatives = 1;

		this.recognition.onresult = (event) => {
			let quote = event.results[event.results.length - 1][0].transcript;
			quote = `\"${this.capitalize(quote)}.\"`;
			this.setState({ quote, speechState: 'quote' });
		}

		this.recognition.onspeechend = (event) => {
			this.setState({ quote: this.state.quote, speechState: 'completed' });
		}

		this.recognition.start();
	}

	abortSpeechRecognition() {
		this.recognition.abort();
	}

	capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	updateQuoteCanvas() {

		// TODO: Create a function that returns all computations. Will allow reusability.

		let ctx = this.quoteCanvas.getContext('2d');
		let { maxWidth } = this.props;
		let { width, height } = this.quoteCanvas;
		let pixelRatio = window.devicePixelRatio;
		let fontSize = 18 * pixelRatio;
		let center = width / 2;
		let adjustedHeight = height - (35 * pixelRatio);
		let adjustedMaxWidth = (maxWidth * pixelRatio);
		let padding = 10 * pixelRatio;
		let lineHeight = fontSize + padding;

		ctx.clearRect(0, 0, width, height);
		ctx.textAlign = "center";
		ctx.fillStyle = '#707070';
		ctx.font = `300 ${fontSize}px Roboto`;
		this.wrapText(ctx, this.state.quote, center, adjustedHeight, adjustedMaxWidth, lineHeight);
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

	handleMicrophoneClick(e) {
		e.preventDefault();
		this.setState({ speechState: 'input' });
	}

	renderUserInputStates(speechState) {
		let { width, height } = this.props;
		let pixelRatio = window.devicePixelRatio;

		// NOTE: In order to remove unwanted blurryness on canvas all dimensions need to be multiplied by the device pixel Ratio then scaled back down with styles to the correct dimensions.

		let quoteCanvasStyle = {
			width: width + 'px',
			height: height + 'px'
		}

		switch(speechState) {
		case 'default':
			return <div className='wt-microphone' onClick={this.handleMicrophoneClick}/>;
		case 'input':
			return <InputPartial enableKeyboard={this.props.enableKeyboard} disableSpeech={this.abortSpeechRecognition} enableSpeech={this.startSpeechRecognition}/>;
		case 'quote':
		case 'completed':
			return <canvas id="quote-canvas" ref={ref => this.quoteCanvas = ref} width={width * pixelRatio} height={height * pixelRatio} style={quoteCanvasStyle}/>;
		}
	}

	handleRetake() {
		this.setState({ speechState: 'input' });
	}

	handleConfirm() {
		this.props.history.push('/print');
	}

	renderRetake() {
		return this.state.speechState === 'completed' ? <Retake onRetake={this.handleRetake} onConfirm={this.handleConfirm}/> : <div></div>;
	}

	render() {
		return(
			<div className='wt-ascii-quote-container'>
        {this.renderUserInputStates(this.state.speechState)}
        {this.renderRetake()}
      </div>
		)
	}
}

export default withRouter(AsciiQuote);