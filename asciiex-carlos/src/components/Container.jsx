import React, { Component } from 'react';
import WelcomePage from 'WelcomePage';
import CameraPage from 'CameraPage';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

class Container extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<main className='container' onClick={()=>document.documentElement.webkitRequestFullScreen()}>
				<BrowserRouter>
          <Switch>
            <Route path="/camera" component={CameraPage}/>
            <Route exact path="/" component={WelcomePage}/>
          </Switch>
        </BrowserRouter>
			</main>
		)
	}
}

export default Container;