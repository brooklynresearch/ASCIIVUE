import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class StartPartial extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<section className='start-view'>
					<Link to='/selection'>
						<h2 className='start-link'>Start</h2>
					</Link>
			</section>
		)
	}
}

export default StartPartial;