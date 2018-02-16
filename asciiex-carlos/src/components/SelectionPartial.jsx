import React from 'react';
import AsciiCamera from 'AsciiCamera';

import AsciiThumbnail from 'AsciiThumbnail';

const AdaImage = () => <img src="/images/wt-ada-ascii.jpg"/>

const KatImage = () => <img src="/images/wt-kat-ascii.jpg"/>

const CameraImage = () => <AsciiCamera/>

const SelectionParital = () => (
	<section className='wt-selection'>
    <div></div>
    <div className='selection-top-row'>
      <AsciiThumbnail to='/camera' className='wt-ascii-camera-preview' width='45vh' height='45vh' component={CameraImage} title='You'/>
    </div>
    <div className='or'>
      or
    </div>
    <div className='selection-bottom-row'>
     <AsciiThumbnail className='left' to='/print' width='20vh' height='20vh' component={AdaImage} title='Ada Lovelace'/>
     <AsciiThumbnail className='right' to='/print' width='20vh' height='20vh' component={KatImage} title='Katherine Johnson'/>
    </div>

  </section>
);

export default SelectionParital;