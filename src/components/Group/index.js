import React from 'react';
import { Container } from '../styled/Container.styled';
import GroupTable from './GroupTable';

const Group = () => {
	return (
		<>
			{/* <div className="wrapper"> */}
			<div className="container">
				<h1 className="header__big">Group</h1>
				<div className="main__section">
					<div className="group__content">
						<GroupTable />
					</div>
				</div>
			</div>
			{/* </div> */}
		</>
	);
};

export default Group;
