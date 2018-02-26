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
			printDimensions: { width: 675, height: 1120 }

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

	componentWillMount() {}
	componentDidMount() {
		// NOTE: NOT DRY.
		let { location } = this.props;
		if(location.state.preset) {
			this.getDataUri(this.state[location.state.preset], (dataURL) => axios.post('/save-image', { dataURL }).then(() => alert('saved successfully')))
			return;
		}
		let ctx = this.finalCanvas.getContext('2d');
		let { finalDimensions } = location.state;
		let { cameraCanvasSize } = finalDimensions;
		let picture = location.state.asciiPicture;
		let quote = location.state.asciiQuote;
		let pictureImage = new Image();
		let quoteImage = new Image();

		// TEMP: Border


		ctx.globalCompositeOperation = "destination-over";
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(0, 0, this.finalCanvas.width, this.finalCanvas.height); //for white background
		ctx.globalCompositeOperation = "source-over";
		ctx.lineWidth = 2 * window.devicePixelRatio;
		ctx.strokeStyle = "#FF0000";
		ctx.strokeRect(0, 0, this.finalCanvas.width, this.finalCanvas.height); //for white background

		pictureImage.onload = function () {
			ctx.drawImage(pictureImage, 0, 0);
		};
		pictureImage.src = picture;
		quoteImage.onload = () => {
			ctx.drawImage(quoteImage, 0, cameraCanvasSize.height * window.devicePixelRatio);
			this.sendPictureToServer();
		};
		quoteImage.src = quote;
	}

	sendPictureToServer() {
		let { location: { state } } = this.props;
		let dataURL = this.finalCanvas.toDataURL("image/png");
		axios.post('/save-image', { dataURL }).then(() => alert('saved successfully'));

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