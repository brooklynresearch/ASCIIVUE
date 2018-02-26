import React from 'react';
import AdaJPG from 'assets/wt-ada-ascii.jpg';
import KatJPG from 'assets/wt-kat-ascii.jpg';

import AsciiThumbnail from 'AsciiThumbnail';

const AdaImage = () => <img src={AdaJPG}/>

const KatImage = () => <img src={KatJPG}/>

const CameraImage = () => <div className='wt-ascii-self-portrait'>Make an<br/>Ascii<br/> Self-Portrait</div>

const PathState = { pathname: '/print', state: { preset: 'ada', cameraCanvasSize: { width: 480, height: 690 } } }

const SelectionParital = ({ location: { state } }) => {
	console.log(state);
	return(
		<section className='wt-selection'>
	    <div></div>
	    <div className='selection-top-row'>
	      <AsciiThumbnail to={{pathname:'/agreement', state}} className='wt-ascii-camera-preview' width='45vh' height='45vh' component={CameraImage}/>
	    </div>
	    <div className='or'>
	      or
	    </div>
	    <div className='selection-bottom-row'>
	     <AsciiThumbnail className='left' to={{pathname:'/print', state: {preset: 'ada'}}} width='20vh' height='20vh' component={AdaImage} title='Ada Lovelace'/>
	     <AsciiThumbnail className='right' to={{pathname:'/print', state: {preset: 'kat'}}} width='20vh' height='20vh' component={KatImage} title='Katherine Johnson'/>
	    </div>

	  </section>
	);
}

export default SelectionParital;