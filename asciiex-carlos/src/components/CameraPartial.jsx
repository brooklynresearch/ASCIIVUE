import React, { Component } from 'react';
import axios from 'axios';
import AsciiCamera from 'AsciiCamera';
import AsciiQuote from 'AsciiQuote';
import SnapShot from 'SnapShot';
import ManualModal from 'ManualModal';
import ReactDOM from 'react-dom';

class CameraPartial extends Component {

	constructor(props) {
		super(props);
		this.state = {
			speech: false,
			keyboard: false,
			quote: '',
			pause: false,
			asciiPicture: null,
			asciiQuote: null,
			quoteCanvasSize: { width: 588, height: 169 },
			cameraCanvasSize: { width: 588, height: 723 }
		}

		this.handleConfirm = ::this.handleConfirm;
		this.handlePauseCamera = ::this.handlePauseCamera;
		this.handleRestartCamera = ::this.handleRestartCamera;

	}

	handleConfirm() {
		let { location, history } = this.props;
		let { state } = location;
		let asciiPicture = this.asciiCam.asciiCanvas.toDataURL();
		this.setState({ asciiPicture });
		this.props.history.push('input', { asciiPicture, invalid: false, ...state });
	}

	componentDidMount() {
		//TODO: NEED TO DETECT KEYBOARD!!!

		let { location } = this.props;

		if(location.state && location.state.asciiPicture) {
			let { asciiPicture, asciiText } = location.state;
			this.setState({ asciiPicture, quote: asciiText, speech: true });
		}

	}

	componentDidUpdate() {
		if(this.state.asciiPicture !== null) {

			setTimeout(() => {
				if(this.asciiCam) {

					let img = new Image();
					img.onload = () => {
						this.asciiCam.pauseCamera()
						let { asciiCanvas } = this.asciiCam;
						let ctx = this.asciiCam.asciiCanvas.getContext('2d');
						ctx.clearRect(0, 0, asciiCanvas.width, asciiCanvas.height);
						ctx.drawImage(img, 0, 0);
					}
					img.src = this.state.asciiPicture;
				}
			}, 200);

		}
	}

	handlePauseCamera() {
		this.asciiCam.pauseCamera();
	}

	handleRestartCamera() {
		this.asciiCam.restartCamera();
	}

	renderPictureQuote() {
		let { speech, keyboard, quoteCanvasSize, quote, asciiPicture, cameraCanvasSize } = this.state;

		if(speech) {
			return <AsciiQuote finalDimensions={{quoteCanvasSize, cameraCanvasSize}} asciiPicture={asciiPicture} initialQuote={quote} {...quoteCanvasSize} maxWidth={585}/>;
		} else {
			return <SnapShot restartCamera={this.handleRestartCamera} pause={this.handlePauseCamera} confirm={this.handleConfirm} countDownFrom={3}/>;
		}
	}

	render() {
		let { cameraCanvasSize, asciiPicture } = this.state;
		let { history } = this.props;

		return(
			<article className='wt-camera-partial'>
					<AsciiCamera asciiPicture={asciiPicture} ref={ref => {
							if(ref=== null) {
								return }
								else{
									this.asciiCam = ref;
								}}} pixelWidth={89} pixelHeight={67} {...cameraCanvasSize}/>
					{this.renderPictureQuote()}
			</article>
		)
	}
}

export default CameraPartial;