import React, { Component } from 'react';
import Retake from 'Retake';
import { withRouter } from 'react-router-dom';

class AsciiQuote extends Component {
	constructor(props) {
		super(props);

		this.state = {
			quote: props.initialQuote,
		}

		this.updateQuoteCanvas = ::this.updateQuoteCanvas;
		this.wrapText = ::this.wrapText;
		this.handleConfirm = ::this.handleConfirm;
		this.handleRetake = ::this.handleRetake;
	}

	componentDidUpdate(prevProps, prevState) {
		// only update if quoting has begun and continues.
		if(this.state.quote !== prevState.quote) {
			this.updateQuoteCanvas();
		}
	}

	componentDidMount() {
		if(this.state.quote.length > 0) {
			this.updateQuoteCanvas();
		}
	}

	updateQuoteCanvas() {

		// TODO: Create a function that returns all computations. Will allow reusability.

		let ctx = this.quoteCanvas.getContext('2d');
		let { maxWidth } = this.props;
		let { width, height } = this.quoteCanvas;
		let pixelRatio = window.devicePixelRatio;
		let fontSize = 25 * pixelRatio;
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
				// retrun to input selection and
				this.props.history.push('input', { asciiPicture: this.props.asciiPicture, invalid: true });
				return;
			}
		}
	}

	handleRetake() {
		this.props.history.push('input', { asciiPicture: this.props.asciiPicture, invalid: false });
	}

	handleConfirm() {
		let { asciiPicture, finalDimensions } = this.props;

		this.setState({ quote: '' });
		let asciiQuote = this.quoteCanvas.toDataURL();
		this.props.history.push('/print', { asciiPicture, asciiQuote, finalDimensions });
	}

	render() {
		let { width, height } = this.props;
		let pixelRatio = window.devicePixelRatio;

		// NOTE: In order to remove unwanted blurryness on canvas all dimensions need to be multiplied by the device pixel Ratio then scaled back down with styles to the correct dimensions.

		let quoteCanvasStyle = {
			width: width + 'px',
			height: height + 'px'
		}
		return(
			<div className='wt-ascii-quote-container'>
				<canvas id="quote-canvas" ref={ref => {
	          if(ref === null) return;
	          this.quoteCanvas = ref;
	        }
	        } width={width * pixelRatio} height={height * pixelRatio} style={quoteCanvasStyle}/>
        <Retake onRetake={this.handleRetake} onConfirm={this.handleConfirm}/>
      </div>
		)
	}
}

export default withRouter(AsciiQuote);