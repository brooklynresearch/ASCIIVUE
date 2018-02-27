import React from 'react';

const Retake = ({ onRetake, onConfirm }) => {
	return(
		<div className='wt-photo-retake'>
      <div className='wt-retake' onClick={onRetake}>Retake</div>
      <div className='wt-photo-confirm' onClick={onConfirm}>OK</div>
    </div>
	)
}

export default Retake;