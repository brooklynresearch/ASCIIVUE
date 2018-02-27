import React, { Component } from 'react';
import MicrophonePartial from 'MicrophonePartial';
import KeyboardPartial from 'KeyboardPartial';
import { debounce } from 'lodash';
import { CSSTransition } from 'react-transition-group';
import Shake from 'Shake';

const InvalidLength = ({ ...props }) => {
	return props.in ? (
		<CSSTransition
	    {...props}
	    timeout={1000}
	    classNames="fade"
	  >
			<div className='wt-invalid-length-container' onClick={props.onClick}>
				<Shake in={props.in}>
					<div className='wt-invalid-length'>
						Sorry, That quote was too long. Try again.
					</div>
				</Shake>
			</div>

	  </CSSTransition>
	) : null;
}

class InputPartial extends Component {

	constructor(props) {
		super(props);

		let { location: { state } } = this.props;

		this.state = {
			inputState: 'default',
			quote: '',
			invalid: state.invalid,
			lang: state.lang
		}

		this.renderUserInputStates = ::this.renderUserInputStates;
		this.startSpeechRecognition = ::this.startSpeechRecognition;
		this.abortSpeechRecognition = ::this.abortSpeechRecognition;
		this.capitalize = ::this.capitalize;
		this.handleSubmit = ::this.handleSubmit;
		this.handleRevertKeyboard = debounce(::this.handleRevertKeyboard, 5000, { leading: false, trailing: true });

	}

	componentDidMount() {}

	componentWillUnmount() {
		this.handleRevertKeyboard.cancel();
	}

	handleRevertKeyboard() {
		this.setState({ inputState: 'default' });;
	}

	handleSubmit(e, text) {
		this.handleRevertKeyboard();
		if(e.keyCode === 13) {
			let { history } = this.props
			let formatedText = text.replace('_', '')
			history.push('camera', { asciiPicture: history.location.state.asciiPicture, asciiText: formatedText });
		}
	}

	startSpeechRecognition() {
		let SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
		let SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
		let SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

		this.recognition = new SpeechRecognition();

		this.recognition.continuous = true;
		this.recognition.lang = this.state.lang;
		this.recognition.interimResults = true;
		this.recognition.maxAlternatives = 1;

		this.recognition.onresult = (event) => {
			let quote = event.results[event.results.length - 1][0].transcript;
			quote = `\"${this.capitalize(quote)}.\"`;
			this.setState({ quote });
		}

		this.recognition.onspeechend = (event) => {
			let { history } = this.props;

			history.push('camera', { asciiPicture: history.location.state.asciiPicture, asciiText: this.state.quote });
		}

		this.recognition.onend = (event) => {
			// if the user hasn't voiced any text. it should revert.
			this.state.quote.length === 0 && this.setState({ inputState: 'default' });
		}

		this.recognition.start();
	}

	capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	abortSpeechRecognition() {
		this.recognition.abort();
	}

	renderUserInputStates(state) {
		let microphoneProps = {
			startSpeechRecognition: this.startSpeechRecognition,
			abortSpeechRecognition: this.abortSpeechRecognition
		}
		switch(state) {
		case 'default':
			return(null);
		case 'microphone':
			return <MicrophonePartial {...microphoneProps}/>;
		case 'keyboard':
			return <KeyboardPartial handleSubmit={this.handleSubmit}/>;
		}
	}

	render() {
		return(
			<div className='wt-input-partial'>
		    <div className='wt-speak' onClick={e=> this.setState({inputState: 'microphone'})}>
					<div className='wt-speak-prompt'>
						Speak to add a quote:
						<div className='wt-speak-text'>
							<div className='wt-microphone'/>
								Start
						</div>
					</div>
				</div>
				<div className='or'>or</div>
		    <div className='wt-type' onClick={e=> this.setState({inputState: 'keyboard'})}>
					<div className='wt-type-prompt'>
						Type Manually:
						<div className='wt-keyboard-text'>
							<div className='wt-keyboard'/>
							Start
						</div>
					</div>
			</div>
			{this.renderUserInputStates(this.state.inputState)}
			<InvalidLength onClick={e => this.setState({invalid: false})} in={this.state.invalid}/>
		  </div>
		)
	}

}


export default InputPartial;