import React from 'react';
import { Container } from '../styled/Container.styled';
import AdminCategoryTable from './AdminCategoryTable';

const AdminCategory = ({
	category,
	user,
	group,
	setNav,
	setGroupData,
	groupData,
}) => {
	return (
		<>
			<div className="container">
				<h1 className="header__big">Categories</h1>

				<div className="main__section">
					<div className="group__content">
						<AdminCategoryTable
							category={category}
							user={user}
							group={group}
							setNav={setNav}
							setGroupData={setGroupData}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminCategory;
