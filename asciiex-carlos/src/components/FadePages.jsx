import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter } from 'react-router-dom';

const FadePages = (props) => {
	return(
		<TransitionGroup className='in' component={'section'}>
       <CSSTransition key={props.location.key} appear={true} timeout={300} classNames='fade'>
		   {React.cloneElement(props.children, { location: props.location })}
      </CSSTransition>
    </TransitionGroup>
	)
}

export default withRouter(FadePages);