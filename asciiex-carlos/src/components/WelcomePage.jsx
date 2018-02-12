import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const Description = () => {
	return(
		<section>
			<div className='description-container'>
				<p className='description'>
					Legam exquisitaque cernantur sint cernantur. Dolor a si labore laborum, do legam
				 noster export consequat an labore offendit praesentibus, laboris irure do
				 probant consectetur, ad fugiat tamen labore possumus, ingeniis distinguantur id
				 admodum, laborum quid ita admodum adipisicing, ea mandaremus te ingeniis.
				 Ullamco aut quem, malis mentitum ea exquisitaque an an magna consequat,
				 incurreret ad esse.Laborum sint nescius, nulla nescius hic quamquam. Singulis
				 coniunctione qui consequat. Ex enim ut magna, an dolore nam aute.
				</p>
			</div>

		</section>
	)
}
const InstructionList = () => {
	return(
		<section className='instructions'>
		<ol>
			<li>Press Continue</li>
			<li>Say your quote</li>
			<li>Press Snap Photo</li>
		</ol>
	</section>)
}
class WelcomePage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<article className='instruction-page'>
				<header><h1>Ascii Video</h1></header>
				<Description/>
				<InstructionList/>
				<div className='continue-button'>
					<Link to='/camera'>
          <div><span>Continue</span></div>
        </Link>
				</div>

		 </article>
		)
	}
}

export default WelcomePage;