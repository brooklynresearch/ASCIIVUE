import React from 'react';
import AsciiThumbnail from 'AsciiThumbnail';

const SelectionParital = () => (
	<section className='wt-selection'>
    <div></div>
    <div className='selection-top-row'>
      <AsciiThumbnail to='/camera' width='45vh' height='45vh' component={'http://lorempixel.com/200/200/'} title='Ada Lovelace'/>
    </div>
    <div className='or'>
      or
    </div>
    <div className='selection-bottom-row'>
     <AsciiThumbnail className='left' to='/camera' width='20vh' height='20vh' component={'http://lorempixel.com/200/200/'} title='Ada Lovelace'/>
     <AsciiThumbnail className='right' to='/camera' width='20vh' height='20vh' component={'http://lorempixel.com/200/200/'} title='Ada Lovelace'/>
    </div>


  </section>
);

export default SelectionParital;