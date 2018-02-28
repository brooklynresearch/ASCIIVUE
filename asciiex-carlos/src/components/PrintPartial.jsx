import React, { Component } from 'react';
import axios from 'axios';
import AdaPreset from 'assets/wt-ada-ascii-preset.png';
import KatPreset from 'assets/wt-kat-ascii-preset.png';

class PrintPartial extends Component {
	constructor(props) {
		super(props);
		this.sendPictureToServer = ::this.sendPictureToServer;

		this.state = {
			ada: AdaPreset,
			kat: KatPreset,
			printDimensions: { width: 675, height: 1120 },
			printed: false

		}

		this.getDataUri = ::this.getDataUri;
	}

	getDataUri(url, callback) {
		let image = new Image();

		image.onload = function () {
			let canvas = document.createElement('canvas');
			canvas.width = this.naturalWidth;
			canvas.height = this.naturalHeight;

			canvas.getContext('2d').drawImage(this, 0, 0);
			callback(canvas.toDataURL());
		};
		image.src = url;
	}

	componentWillUnmount() {
		clearInterval(this.timeout);

	}
	componentDidUpdate() {}
	componentDidMount() {
		this.timeout = setTimeout(() => {
			this.props.history.push('/start');
		}, 10000);
		// NOTE: NOT DRY.
		let pixelRatio = window.devicePixelRatio;
		let { location } = this.props;
		if(location.state.preset) {
			this.getDataUri(this.state[location.state.preset], (dataURL) => {
				axios.post('/save-image', { dataURL });
			});

		} else {
			let ctx = this.finalCanvas.getContext('2d');
			let { finalDimensions } = location.state;
			let { cameraCanvasSize } = finalDimensions;
			let picture = location.state.asciiPicture;
			let quote = location.state.asciiQuote;
			let pictureImage = new Image();
			let quoteImage = new Image();

			// TEMP: Border

			let rotation = 180 * Math.PI / 180;
			ctx.translate(this.finalCanvas.width / 2, this.finalCanvas.height / 2);
			ctx.rotate(rotation);
			ctx.translate(-this.finalCanvas.width / 2, -this.finalCanvas.height / 2);

			// ctx.globalCompositeOperation = "destination-over";
			// ctx.fillStyle = "#FFFFFF";
			// ctx.fillRect(0, 0, this.finalCanvas.width, this.finalCanvas.height); //for white background
			// ctx.globalCompositeOperation = "source-over";
			// ctx.lineWidth = 2 * window.devicePixelRatio;
			// ctx.strokeStyle = "#FF0000";
			// ctx.strokeRect(0, 0, this.finalCanvas.width, this.finalCanvas.height); //for white background
			let printWidth = (43 * pixelRatio) - this.finalCanvas.width;
			let printHeight = (381 * pixelRatio) - this.finalCanvas.height;
			pictureImage.onload = function () {
				ctx.drawImage(pictureImage, 44 * pixelRatio, 30 * pixelRatio);
			};
			pictureImage.src = picture;
			quoteImage.onload = () => {
				ctx.drawImage(quoteImage, 44 * pixelRatio, 713 * pixelRatio);
				this.sendPictureToServer();
			};
			quoteImage.src = quote;

		}

	}

	sendPictureToServer() {
		let { location: { state } } = this.props;
		let dataURL = this.finalCanvas.toDataURL();
		axios.post('/save-image', { dataURL });

		this.finalCanvas.getContext('2d').clearRect(0, 0, this.finalCanvas.width, this.finalCanvas.height);
	}
	renderFinalCanvas() {
		let pixelRatio = window.devicePixelRatio;
		let { location } = this.props;
		if(location.state.preset) {
			return(null);
		}
		let { printDimensions } = this.state;
		let { state: { finalDimensions, asciiPicture, asciiCamera } } = location;
		let { cameraCanvasSize, quoteCanvasSize } = finalDimensions;
		let finalWidth = printDimensions.width * pixelRatio;
		let finalHeight = printDimensions.height * pixelRatio;
		let finalCanvasStyles = {
			filter: 'grayscale(1)',
			width: '100%',
			height: '100%',
			zIndex: -100000
		}
		return(
			<canvas ref={ref => this.finalCanvas = ref} style={finalCanvasStyles} id='finalCanvas' width={finalWidth} height={finalHeight}/>
		)
	}

	render() {
		return(
			<div className='wt-print-partial'>
				<div className='wt-thanks'>
				 Thank You.
			 </div>
			 <div className='wt-printing'>
				 Your sticker is now printing.
			 </div>
				{this.renderFinalCanvas()}
	  	</div>
		)
	}
}

export default PrintPartial;