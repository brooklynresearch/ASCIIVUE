import React, { Component } from 'react';
import StartPartial from 'StartPartial';
import Views from 'Views';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import FadePages from 'FadePages';

class Container extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<main className='container' onClick={()=>document.documentElement.webkitRequestFullScreen()}>
				<BrowserRouter>
					<article className='wt-views'>
						<section className='wt-partial'>
							<FadePages>
								<Switch>
			            <Route path="/:id" component={Views}/>
			            <Route exact path="/" component={StartPartial}/>
			          </Switch>
							</FadePages>
							</section>
		        <footer className='wt-footer'>
								<div className='wt-logo'/>
		        </footer>
		      </article>
        </BrowserRouter>
			</main>
		)
	}
}


export default Container;