import React from 'react';
import { Container } from '../styled/Container.styled';
import GroupTable from './GroupTable';

const Group = ({ category, user, group, setNav, setGroupData, groupData }) => {
	return (
		<>
			{/* <div className="wrapper"> */}

			{category &&
				groupData.cid &&
				category.map(c => {
					if (c.cid == groupData.cid)
						return (
							<div className="container">
								<h1 className="header__big">
									{c.name}
								</h1>
								<div className="main__section">
									<div className="group__content">
										<GroupTable
											category={c}
											user={user}
											group={group}
											setNav={setNav}
											setGroupData={
												setGroupData
											}
										/>
									</div>
								</div>
							</div>
						);
				})}
			{category &&
				!groupData.cid &&
				category.map(c => {
					return (
						<div className="container" key={c.cid}>
							<h1 className="header__big">{c.name}</h1>
							<div className="main__section">
								<div className="group__content">
									<GroupTable
										category={c}
										user={user}
										group={group}
										setNav={setNav}
										setGroupData={setGroupData}
									/>
								</div>
							</div>
						</div>
					);
				})}
			{/* </div> */}
		</>
	);
};

export default Group;
