import React from 'react';
import { TimelineMax, Power1 } from 'gsap';

class MicrophonePartial extends React.Component {
	constructor(props) {
		super(props);
		this.getDotsWaveTl = ::this.getDotsWaveTl;
	}

	componentDidMount() {
		let tl = new TimelineMax({ repeat: -1, repeatDelay: 2 });
		tl.add(this.getDotsWaveTl(this.googleLoading.children));
		tl.timeScale(2);

		this.props.startSpeechRecognition();

	}

	getDotsWaveTl(dots) {
		var dotsWaveTl = new TimelineMax();

		let $dots = [...dots];

		$dots.forEach(function (element, index) {

			var dotWaveTl = new TimelineMax(),
				delay = 0.15;

			dotWaveTl
				.to(element, 0.4, { y: -15, ease: Power1.easeOut })
				.to(element, 0.8, { y: 15, ease: Power1.easeInOut })
				.to(element, 0.4, { y: 0, ease: Power1.easeIn })
				.to(element, 0.4, { y: -15, ease: Power1.easeOut })
				.to(element, 0.8, { y: 15, ease: Power1.easeInOut })
				.to(element, 0.4, { y: 0, ease: Power1.easeIn });

			dotsWaveTl.add(dotWaveTl, delay * index);

		});

		return dotsWaveTl;
	}

	render() {
		return(
			<div className='wt-microphone-partial'>
        <div className='wt-listening'>
          <div className='wt-listening-animation'>
            <svg  ref={ref => this.googleLoading = ref} className='wt-loading' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 365.77 53.3">
              <path fill="#4d8de9" d="M26.46.22c15.28-.57 26.2 12.53 26.61 24.6.61 18.21-13 27.83-25.3 28.28A26.37 26.37 0 0 1 .01 26.79C-.19 12.32 11.82-.25 26.46.22z"/>
							<path fill="#cf5444" d="M130.98 52.84a25.91 25.91 0 0 1-26.27-26.26A26.21 26.21 0 0 1 131.34.34c14 .09 25.86 12 25.82 25.84-.02 15.05-11.5 26.72-26.18 26.66z"/>
              <path fill="#f1c145" d="M261.4 26.21c.68 15.18-12.19 27.18-26.76 27.09-13.56-.08-26.21-12.48-26.17-26.6C208.5 12.03 221.2-.25 235.54.03c13.96.22 26.51 12.47 25.86 26.18z"/>
              <path fill="#5eab66" d="M339.37 52.87c-13.7.68-26.57-11.94-26.3-26.58.25-13.85 12.11-26.43 26.92-26.08a26.52 26.52 0 0 1 25.78 26.71 26.06 26.06 0 0 1-26.4 25.95z"/>
            </svg>
          </div>
          Listening...
        </div>
      </div>)
	}

}


export default MicrophonePartial;