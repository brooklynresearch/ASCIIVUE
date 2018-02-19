import React, { Component } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import AsciiCamera from 'AsciiCamera';
import AsciiQuote from 'AsciiQuote';
import SnapShot from 'SnapShot';
import ManualModal from 'ManualModal';

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
			quoteCanvasSize: { width: 400, height: 50 },
			cameraCanvasSize: { width: 400, height: 510 }
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
		this.setState({ asciiPicture, speech: true });
	}

	componentDidMount() {}

	componentDidUpdate() {}

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
		this.handleRevertKeyboard();
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

		if(keyboard) {
			return <ManualModal modalValue={quote} onFocus={this.handleOnFocus} onChange={this.handleOnChange} onBlur={this.handleBlur} onKeyDown={this.handleSubmit}/>;
		} else if(speech) {
			return <AsciiQuote finalDimensions={{ quoteCanvasSize, cameraCanvasSize }} asciiPicture={asciiPicture} initialQuote={quote} enableKeyboard={this.handleKeyboard} {...quoteCanvasSize} maxWidth={300}/>;
		} else {
			return <SnapShot restartCamera={this.handleRestartCamera} pause={this.handlePauseCamera} confirm={this.handleConfirm} countDownFrom={3}/>;
		}
	}

	handleKeyboard() {
		this.setState({ keyboard: true });
	}

	render() {
		let { cameraCanvasSize } = this.state;
		return(
			<article className='wt-camera-partial'>
					<AsciiCamera ref={ref=> this.asciiCam = ref} pixelWidth={73} pixelHeight={90} {...cameraCanvasSize}/>
					{this.renderPictureQuote()}
			</article>
		)
	}
}

export default CameraPartial;