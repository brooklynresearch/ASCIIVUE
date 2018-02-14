import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AsciiThumbnail extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { to, component, title, width, height, className } = this.props;
		let backgroundStyle = { width, height, background: `url(${component})` }

		return(
			<Link to={to} style={{width, height}} className={`ascii-thumbnail ${className}`}>
        <div style={backgroundStyle} className='ascii-background'>
          <div className='ascii-foreground'>
            {title}
          </div>
        </div>

      </Link>

		)
	}
}

export default AsciiThumbnail;