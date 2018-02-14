import React, { Component } from 'react';
import SelectionPartial from 'SelectionPartial';
import AgreementParital from 'AgreementPartial';
import CameraPartial from 'CameraPartial';
import StartPartial from 'StartPartial';

class Views extends Component {
	constructor(props) {
		super(props);

		this.partials = {
			selection: SelectionPartial,
			agreement: AgreementParital,
			camera: CameraPartial,
			start: StartPartial
		}
	}

	render() {
		let { match } = this.props;

		console.log(match.params.id);

		let Partial = this.partials[match.params.id || 'start'];
		return(
			<article className='wt-view'>
        <section className='wt-partial'>
          <Partial {...this.props}/>
        </section>
        <footer className='wt-footer'>
        </footer>
      </article>
		)
	}
}

export default Views;