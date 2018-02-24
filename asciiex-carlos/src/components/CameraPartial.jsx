import React, { Component } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
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
			quoteCanvasSize: { width: 480, height: 50 },
			cameraCanvasSize: { width: 480, height: 640 }
		}

		this.handleConfirm = ::this.handleConfirm;
		this.handleKeyboard = ::this.handleKeyboard;
		this.handleBlur = ::this.handleBlur;
		this.handleOnChange = ::this.handleOnChange;
		this.handleSubmit = ::this.handleSubmit;
		this.handleOnFocus = ::this.handleOnFocus;
		this.handlePauseCamera = ::this.handlePauseCamera;
		this.handleRestartCamera = ::this.handleRestartCamera;

		this.handleRevertKeyboard = debounce(::this.handleRevertKeyboard, 2000, { leading: false, trailing: true });

	}

	handleConfirm() {
		let asciiPicture = this.asciiCam.asciiCanvas.toDataURL()
		this.setState({ asciiPicture });
		this.props.history.push('input', { asciiPicture });
	}

	componentDidMount() {
		//TODO: NEED TO DETECT KEYBOARD!!!

		let { location } = this.props;

		if(location.state) {
			let { asciiPicture, asciiText } = location.state;
			this.setState({ asciiPicture, quote: asciiText, speech: true });
		}

	}

	componentDidUpdate() {
		if(this.state.asciiPicture !== null) {

			setTimeout(() => {
				if(this.asciiCam) {
					this.asciiCam.pauseCamera()
					let { asciiCanvas } = this.asciiCam;
					let ctx = this.asciiCam.asciiCanvas.getContext('2d');
					ctx.clearRect(0, 0, asciiCanvas.width, asciiCanvas.height);
					let img = new Image();
					img.onload = () => {
						ctx.drawImage(img, 0, 0);
					}
					img.src = this.state.asciiPicture;
				}
			}, 500);

		}
	}

	handleOnFocus() {
		this.handleRevertKeyboard();
	}

	handleOnChange(e) {
		this.setState({ quote: `"${e.target.value}_"` });
	}

	handleBlur() {
		this.setState({ speech: true, keyboard: false });
	}

	handleRevertKeyboard() {
		this.setState({ speech: true, keyboard: false, quote: '' });
	}

	handleSubmit(e) {
		if(e.keyCode === 13) {
			this.setState({ quote: this.state.quote.replace('_', ''), speech: true, keyboard: false });
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
			return <AsciiQuote finalDimensions={{ quoteCanvasSize, cameraCanvasSize }} asciiPicture={asciiPicture} initialQuote={quote} enableKeyboard={this.handleKeyboard} {...quoteCanvasSize} maxWidth={300}/>;
		} else {
			return <SnapShot restartCamera={this.handleRestartCamera} pause={this.handlePauseCamera} confirm={this.handleConfirm} countDownFrom={3}/>;
		}
	}

	handleKeyboard() {
		this.setState({ keyboard: true });
	}

	render() {
		let { cameraCanvasSize, asciiPicture } = this.state;
		let { history } = this.props;

		return(
			<article className='wt-camera-partial'>
					<AsciiCamera asciiPicture={asciiPicture} ref={ref=> this.asciiCam = ref} pixelWidth={120} pixelHeight={140} {...cameraCanvasSize}/>
					{this.renderPictureQuote()}
			</article>
		)
	}
}

export default CameraPartial;