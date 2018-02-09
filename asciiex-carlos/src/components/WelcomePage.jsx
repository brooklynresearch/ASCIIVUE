import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class WelcomePage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
       <p>blah blah blah here goes directions.</p>
       <Link to='/camera'>
         <div>CAMERA</div>
       </Link>
      </div>
		)
	}
}

export default WelcomePage;