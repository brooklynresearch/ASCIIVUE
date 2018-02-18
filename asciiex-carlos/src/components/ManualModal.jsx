import React from 'react';

const ManualModal = () => {
	// start speech recognition everytime component is shown.
	return(
		<div className='wt-input-manual-modal-container'>
      <div className='wt-input-manual-modal'>
  	  </div>
      <input type='text' className='wt-invisible-text-input' autoFocus={true}/>
	  </div>
	)
};

export default ManualModal;