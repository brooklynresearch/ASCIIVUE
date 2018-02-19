import React, { Component } from 'react';
import axios from 'axios';

class PrintPartial extends Component {
	constructor(props) {
		super(props);
		this.sendPictureToServer = ::this.sendPictureToServer;

	}

	componentDidMount() {
		let ctx = this.finalCanvas.getContext('2d');
		let { location } = this.props;
		let { finalDimensions } = location.state;
		let { cameraCanvasSize } = finalDimensions;
		let picture = location.state.asciiPicture;
		let quote = location.state.asciiQuote;
		let pictureImage = new Image();
		let quoteImage = new Image();
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
		let dataURL = this.finalCanvas.toDataURL("image/png");
		axios.post('/save-image', { dataURL }).then(() => alert('saved successfully'));
		this.finalCanvas.getContext('2d').clearRect(0, 0, this.finalCanvas.width, this.finalCanvas.height);
	}
	renderFinalCanvas() {
		let pixelRatio = window.devicePixelRatio;
		let { location } = this.props;
		let { state: { finalDimensions, asciiPicture, asciiCamera } } = location;
		let { cameraCanvasSize, quoteCanvasSize } = finalDimensions;
		let finalWidth = cameraCanvasSize.width * pixelRatio;
		let finalHeight = (cameraCanvasSize.height + quoteCanvasSize.height) * pixelRatio;
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