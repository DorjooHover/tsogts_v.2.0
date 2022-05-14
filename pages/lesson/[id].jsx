import React from 'react';
// import { Container } from '../styled/Container.styled';
import { useRouter } from 'next/router';
import Lesson from '../../src/components/Lesson';
// import Lessons from '.';

const Lessons = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			{/* <div className="wrapper"> */}
			<div className="container">
				<h1 className="header__big">{id}</h1>
				<Lesson />
			</div>
			{/* </div> */}
		</>
	);
};

export default Lessons;
