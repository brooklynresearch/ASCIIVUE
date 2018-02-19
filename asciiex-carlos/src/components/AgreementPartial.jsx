import React from 'react';
import { Link } from 'react-router-dom';

const AgreementParital = () => (
	<section className='wt-agreement-partial'>
    <div className='wt-agreement-text' >
      Google won't use data from your photo for any other purpose than creating your sticker and won't store photos.
    </div>
    <div className='wt-agreement-confirm'>
      <div>
        <Link to='/start'>
          No Thanks
        </Link>
      </div>
      <div>
        <Link to='/camera'>
        I Understand
      </Link>
      </div>
    </div>
  </section>
);

export default AgreementParital;