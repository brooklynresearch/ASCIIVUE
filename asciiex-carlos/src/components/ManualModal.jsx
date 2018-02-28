import React from 'react';

const ManualModal = (props) => {
	// start speech recognition everytime component is shown.
	return(
		<div className='wt-input-manual-modal-container'>
      <div className='wt-input-manual-modal'>
        <div className='wt-input-manual-text'>
          {props.modalValue}
        </div>
  	  </div>
      <input type='text' className='wt-invisible-text-input' {...props} autoFocus={true}/>
	  </div>
	)
};

export default ManualModal;