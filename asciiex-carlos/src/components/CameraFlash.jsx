import React from 'react';
import { Transition } from 'react-transition-group';

const duration = 500;

const defaultStyle = {
	opacity: 0,
	backgroundColor: '#FFF'
}

const transitionStyles = {
	entering: {
		opacity: 1,
		animationName: 'flash',
		animationDuration: `${duration}ms`
	},
	entered: {},
};

const CameraFlash = ({ in: inProp }) => (
	<Transition in={inProp} timeout={duration}>
    {(state) => (
      <div className='wt-camera-flash' style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
			
      </div>
    )}
  </Transition>
);

export default CameraFlash;