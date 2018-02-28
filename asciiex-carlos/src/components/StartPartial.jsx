import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Options = ({ exitOnClick, onClick }) => {
	let languages = [['United States', 'en-US'], ['Français', 'fr-FR'], ['Español', 'es-US'], ['Português', 'pt-PT'], ['German (Germany)', 'de-DE'], ['Русский (Россия)', 'ru-RU']];

	return(
		<div className='wt-lang-opt'>
			<h2>Languages</h2>
			{languages.map((language) => {
				return (<div key={language[1]} className='wt-language' onClick={e=>onClick(language[1])}>{language[0]}</div>)
			})}
			<div className='wt-exit-opt' onClick={exitOnClick}/>
		</div>
	)
}

const HiddenMenuButton = (props) => <div {...props} className='wt-hidden'/>

class StartPartial extends Component {
	constructor(props) {
		super(props);

		this.state = {
			optionsVisible: false,
			lang: 'en-US',
			count: 0
		}

		this.handleLanguageOnClick = ::this.handleLanguageOnClick;
		this.renderOptions = ::this.renderOptions;
		this.showOptionsMenu = ::this.showOptionsMenu;
		this.handleExitOnClick = ::this.handleExitOnClick;
	}

	handleLanguageOnClick(lang) {
		this.setState({ lang });
	}

	renderOptions(shouldRender, optionProps) {
		return shouldRender ? <Options {...optionProps}/> : null;
	}

	showOptionsMenu() {
		if(this.state.count >= 5) {
			this.setState({ optionsVisible: true });
		}

		this.setState({ count: this.state.count + 1 });

	}

	handleExitOnClick() {
		this.setState({ count: 0, optionsVisible: false })
	}

	render() {
		let { optionsVisible, lang } = this.state;
		let optionProps = {
			onClick: this.handleLanguageOnClick,
			exitOnClick: this.handleExitOnClick
		}

		let toParams = {
			pathname: '/selection',
			state: { lang }
		}
		return(
			<section className='start-view'>
					<Link to={toParams}>
						<h2 className='start-link'>Start</h2>
					</Link>
					<HiddenMenuButton onClick={this.showOptionsMenu}/>
					{this.renderOptions(optionsVisible, optionProps)}
			</section>
		)
	}
}

export default StartPartial;