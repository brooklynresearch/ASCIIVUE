import React, { Component } from 'react';
import SelectionPartial from 'SelectionPartial';
import AgreementParital from 'AgreementPartial';
import CameraPartial from 'CameraPartial';
import StartPartial from 'StartPartial';
import PrintPartial from 'PrintPartial';
import InputPartial from 'InputPartial';

class Views extends Component {
	constructor(props) {
		super(props);

		this.partials = {
			selection: SelectionPartial,
			agreement: AgreementParital,
			camera: CameraPartial,
			start: StartPartial,
			print: PrintPartial,
			input: InputPartial
		}
	}

	render() {
		let { match } = this.props;

		let Partial = this.partials[match.params.id] || StartPartial;
		return(
			<Partial {...this.props}/>
		)
	}
}

export default Views;