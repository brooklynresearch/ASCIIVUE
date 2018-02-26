import React from 'react';
import { Transition } from 'react-transition-group';

const duration = 500;

const transitionStyles = {
	entered: {
		animationName: 'shake',
		animationDuration: `${duration}ms`
	},
	entering: {},
};

const Shake = ({ children, in: inProp }) => {

	return(
		<Transition in={inProp} timeout={duration}>
      {(state) => {
        return React.cloneElement(children, {style: {...transitionStyles[state]}});
      }}
    </Transition>
	)
};


export default Shake;