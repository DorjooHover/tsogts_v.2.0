import React from 'react';
import { useRouter } from 'next/router';
import GroupStudentTable from '../../src/components/Group/GroupStudent';

const group = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			{/* <div className="wrapper"> */}
			<div className="container">
				<h1 className="header__big">{id}</h1>
				<GroupStudentTable />
			</div>
			{/* </div> */}
		</>
	);
};

export default group;
