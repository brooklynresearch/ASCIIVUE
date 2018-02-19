import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Retake from 'Retake';
import CameraFlash from 'CameraFlash';

const Camera = ({ onClick }) => <div className='wt-camera-icon' onClick={onClick}/>

const CameraCountDown = ({ seconds, onCountDown }) => {
	onCountDown(seconds);
	return(
		<div className='wt-camera-countdown'>{seconds}</div>
	)
}

class SnapShot extends Component {
	constructor(props) {
		super(props);

		this.handleCountDown = ::this.handleCountDown;
		this.handleSnapShotClick = ::this.handleSnapShotClick;
		this.renderCameraAction = ::this.renderCameraAction;
		this.handleRetakeClick = ::this.handleRetakeClick;
		this.fireRearCameraFlash = ::this.fireRearCameraFlash;
		this.disableFlash = ::this.disableFlash;

		this.state = {
			seconds: this.props.countDownFrom,
			action: 'camera',
			flash: false
		}
	}

	componentDidMount() {}

	handleRetakeClick() {
		this.props.restartCamera();
		this.setState({ action: 'countdown', seconds: this.props.countDownFrom });
	}

	fireRearCameraFlash() {

		let imageCapture = null;
		var deviceConfig = {
			video: {
				width: 480,
				height: 640,
				facingMode: "environment",
				deviceId: null
			}
		};

		var imageCaptureConfig = {
			fillLightMode: "flash",
			/* or "flash" */
			focusMode: "continuous"
		};

		if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			let rearCamera = navigator.mediaDevices.getUserMedia(deviceConfig);
			rearCamera.then(stream => {

				let track = stream.getVideoTracks()[0];
				imageCapture = new ImageCapture(track);

				imageCapture.setOptions(imageCaptureConfig);
				imageCapture.getPhotoCapabilities().then(() => {

					track.applyConstraints({
						advanced: [{ torch: true }]
					});
				});
			})
			return rearCamera;
		};
	}

	disableFlash() {
		this.flashPromise.then(stream => {

			let track = stream.getVideoTracks()[0];
			track.stop();
		})
	}

	handleCountDown(seconds) {
		let interval = setInterval(() => {
			seconds--
			if(seconds == 2) {
				this.flashPromise = this.fireRearCameraFlash();
			}
			// Display 'counter' wherever you want to display it.
			if(seconds == 0) {
				// Display a login box
				clearInterval(interval);
				this.props.pause();
				this.setState({ flash: !this.state.flash, action: 'retake' })
			}

			this.setState({ seconds });
		}, 1000);
	}

	handleSnapShotClick(e) {
		e.preventDefault();


		this.setState({ action: 'countdown' });
	}

	renderCameraAction({ action, seconds }, handlers) {
		let cameraAction = {
			camera: Camera,
			countdown: CameraCountDown,
			retake: Retake
		}
		if(action == 'retake') {
			setTimeout(this.disableFlash, 1000);
		}

		return cameraAction[action]({ seconds, ...handlers });
	}



	render() {
		let { action, seconds } = this.state;
		let handlers = {
			onClick: this.handleSnapShotClick,
			onCountDown: this.handleCountDown,
			onRetake: this.handleRetakeClick,
			onConfirm: this.props.confirm
		}
		return(
			<div className='wt-snapshot'>
				<CameraFlash in={this.state.flash}/>
       {this.renderCameraAction({action, seconds}, handlers)}
      </div>)
	}
}

export default SnapShot;