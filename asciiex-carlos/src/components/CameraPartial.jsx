import React, { Component } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import AsciiCamera from 'AsciiCamera';
import AsciiQuote from 'AsciiQuote';
import SnapShot from 'SnapShot';
import ManualModal from 'ManualModal';
// import wtLogo from '../assets/wt-logo.jpg';

class CameraPartial extends Component {
	constructor(props) {
		super(props);
		this.state = {
			speech: false,
			keyboard: false
		}
		this.handleSpeech = ::this.handleSpeech;
		this.handleKeyboard = ::this.handleKeyboard;
	}

	handleSpeech() {
		this.setState({ speech: true });
	}

	componentDidMount() {}

	componentDidUpdate() {}


	renderPictureQuote() {
		let { speech, keyboard } = this.state;

		if(keyboard) {
			return <ManualModal/>;
		} else if(speech) {
			return <AsciiQuote enableKeyboard={this.handleKeyboard} width={375} height={50} maxWidth={300}/>;
		} else {
			return <SnapShot enableSpeech={this.handleSpeech} countDownFrom={3}/>;
		}
	}

	handleKeyboard() {
		this.setState({ keyboard: true });
	}

	render() {
		return(
			<article className='wt-camera-partial'>
					<AsciiCamera/>
					{this.renderPictureQuote()}
			</article>
		)
	}
}

export default CameraPartial;