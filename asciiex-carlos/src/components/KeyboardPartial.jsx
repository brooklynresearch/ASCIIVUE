import React from 'react';

class KeyboardPartial extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ''
		}

		this.handleOnChange = ::this.handleOnChange;
	}

	handleOnChange(e) {
		this.setState({ text: `"${e.target.value}_"` });
	}

	render() {
		return(
			<div className='wt-keyboard-partial' onClick={()=> this.input.focus()}>
      <div className='wt-keyboard-modal'>
        <div className='wt-keyboard-text'>
          {this.state.text}
        </div>
  	  </div>
      <input ref={ref => this.input = ref} type='text' className='wt-invisible-text-input' onChange={this.handleOnChange} onKeyDown={e=> this.props.handleSubmit(e, this.state.text)} autoFocus={true}/>

  </div>)
	}

}


export default KeyboardPartial;