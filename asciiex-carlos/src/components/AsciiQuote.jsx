import React, { Component } from 'react';
import aalib from 'aalib.js';

class AsciiQuote extends Component {
	constructor(props) {
		super(props);

		this.state = {
			quote: ''
		}

		this.startSpeechRecognition = ::this.startSpeechRecognition;
		this.updateQuoteCanvas = ::this.updateQuoteCanvas;
		this.wrapText = ::this.wrapText;
		this.capitalize = ::this.capitalize;

	}

	componentDidUpdate() {
		this.updateQuoteCanvas();
	}
	componentDidMount() {
		this.startSpeechRecognition();
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

	capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	updateQuoteCanvas() {
		let ctx = this.quoteCanvas.getContext('2d');
		let { maxWidth } = this.props;
		let { width, height } = this.quoteCanvas;
		ctx.clearRect(0, 0, width, height);
		ctx.textAlign = "center";
		ctx.font = '12px verdana';
		this.wrapText(ctx, this.state.quote, width / 2, height - 35, maxWidth, 20);
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

	render() {
		let { width, height } = this.props;
		return(
			<canvas ref={ref => this.quoteCanvas = ref} id="quote-canvas" width={width} height={height}/>)
	}
}

export default AsciiQuote;