import React, { Component } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import AsciiCamera from 'AsciiCamera';
import AsciiQuote from 'AsciiQuote';
import SnapShot from 'SnapShot';
// import wtLogo from '../assets/wt-logo.jpg';

class CameraPartial extends Component {
	constructor(props) {
		super(props);
		this.state = {
			speech: false
		}
		this.handleSpeech = ::this.handleSpeech;
	}

	handleSpeech() {
		this.setState({ speech: true });
	}

	componentDidMount() {}

	componentDidUpdate() {}

	renderPictureQuote() {
		return this.state.speech ? <AsciiQuote/> : <SnapShot enableSpeech={this.handleSpeech} countDownFrom={3}/>;
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