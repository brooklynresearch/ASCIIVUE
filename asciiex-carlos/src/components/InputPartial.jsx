import React from 'react';

const InputPartial = ({ enableSpeech, disableSpeech, enableKeyboard }) => {
	// start speech recognition everytime component is shown.

	enableSpeech();
	return(
		<div className='wt-input-partial' onClick={()=>{
				disableSpeech();
				enableKeyboard();
			}}>
	    <div className='wt-speak'>Speak to add a quote...</div>
	    <div className='wt-type'>Or enter manually<span className='wt-keyboard'></span></div>
	  </div>
	)
};

export default InputPartial;