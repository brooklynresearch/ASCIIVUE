import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AsciiThumbnail extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { to, component, title, width, height, className } = this.props;
		let backgroundStyle = { width, height }

		return(
			<Link to={to} style={{width, height}} className={`ascii-thumbnail ${className}`}>
        <div style={backgroundStyle} className='ascii-background'>
          {component()}
          {title ? <div className='ascii-foreground'>
            {title}
          </div> : null}
        </div>

      </Link>

		)
	}
}

export default AsciiThumbnail;