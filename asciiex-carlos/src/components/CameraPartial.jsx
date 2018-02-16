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
	}

	componentDidMount() {}

	componentDidUpdate() {}

	render() {
		return(
			<article className='wt-camera-partial'>
					<AsciiCamera/>
					<SnapShot countDownFrom={3}/>
			</article>
		)
	}
}

export default CameraPartial;