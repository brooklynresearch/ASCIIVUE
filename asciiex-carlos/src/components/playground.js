< header className = 'camera-page-header' >
	<
	div id = 'wt-logo'
onClick = {
		this.props.history.goBack
	} >
	<
	img src = 'wt-logo.jpg' > < /img> <
	/div> <
	div id = 'retry-speech'
onClick = {
		() => {
			this.active();
			this.setState({
				quote: ''
			});
			this.startSpeechRecognition();
		}
	} >
	<
	div className = 'reload-arrow' >
	<
	Arrow / >
	<
	/div> <
	/div> <
	/header>