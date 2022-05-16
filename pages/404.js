import React from 'react';
import Link from 'next/link';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
const Notfound = () => {
	return (
		<div id="not__found">
			<h1 className="header__big">
				Ooooops... <SentimentVeryDissatisfiedIcon fontSize="large"  />
			</h1>
			<h2 className="header__small">That page not found.</h2>
			<p>
				Go back to
				<Link href="/">
					<a> Home page</a>
				</Link>
			</p>
		</div>
	);
};

export default Notfound;
