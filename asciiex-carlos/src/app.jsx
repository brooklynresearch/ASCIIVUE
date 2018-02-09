import React from 'react'
import ReactDOM from 'react-dom'
import Container from 'Container';

// Compile SCSS to CSS and inject it onto the DOM.
require('style-loader!css-loader!sass-loader!applicationStyles');

ReactDOM.render(
	<Container/>,
	document.getElementById('root'),
)