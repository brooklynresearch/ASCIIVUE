import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Camera = ({ onClick }) => <div className='wt-camera-icon' onClick={onClick}/>

const CameraCountDown = ({ seconds, onCountDown }) => {
	onCountDown(seconds);
	return(
		<div className='wt-camera-countdown'>{seconds}</div>
	)
}

const Retake = ({ onRetake, onConfirm }) => {
	return(
		<div className='wt-photo-retake'>
      <div className='wt-retake' onClick={onRetake}>Retake</div>
      <div className='wt-photo-confirm' onClick={onConfirm}>OK</div>
    </div>
	)
}

class SnapShot extends Component {
	constructor(props) {
		super(props);

		this.handleCountDown = ::this.handleCountDown;
		this.handleSnapShotClick = ::this.handleSnapShotClick;
		this.renderCameraAction = ::this.renderCameraAction;
		this.handleRetakeClick = ::this.handleRetakeClick;

		this.state = {
			seconds: this.props.countDownFrom,
			action: 'camera'
		}
	}

	componentDidMount() {
		console.log(this.state);
	}

	handleRetakeClick() {
		this.setState({ action: 'countdown', seconds: this.props.countDownFrom });
	}

	handleCountDown(seconds) {
		let interval = setInterval(() => {
			seconds--

			// Display 'counter' wherever you want to display it.
			if(seconds == 0) {
				// Display a login box
				clearInterval(interval);
				this.setState({ action: 'retake' })
			}

			this.setState({ seconds });
		}, 1000);
	}

	handleSnapShotClick(e) {
		e.preventDefault();
		// let ctx = this.quoteCanvas.getContext('2d');
		// ctx.drawImage(this.asciiCanvas, 0, 0, 375, 510);
		//
		// let dataURL = this.quoteCanvas.toDataURL("image/png");
		// axios.post('/save-image', { dataURL }).then(() => alert('saved successfully'));
		// ctx.clearRect(0, 0, 375, 510);

		this.setState({ action: 'countdown' });
	}

	renderCameraAction({ action, seconds }, handlers) {
		let cameraAction = {
			camera: Camera,
			countdown: CameraCountDown,
			retake: Retake
		}

		return cameraAction[action]({ seconds, ...handlers });
	}

	render() {
		let { action, seconds } = this.state;
		let handlers = {
			onClick: this.handleSnapShotClick,
			onCountDown: this.handleCountDown,
			onRetake: this.handleRetakeClick,
			onConfirm: this.props.enableSpeech
		}
		return(
			<div className='wt-snapshot'>
       {this.renderCameraAction({action, seconds}, handlers)}
      </div>)
	}
}

export default SnapShot;