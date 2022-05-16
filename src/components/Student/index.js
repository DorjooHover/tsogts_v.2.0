import React from 'react';
import StudentTable from './StudentTable';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddButtonStyled from '../PopUpAdd/AddButtonStyled';
// import MUIDataTable from 'mui-datatables';

// const columns = ['Name', 'Company', 'City', 'State'];

// const data = [
// 	['Joe James', 'Test Corp', 'Yonkers', 'NY'],
// 	['John Walsh', 'Test Corp', 'Hartford', 'CT'],
// 	['Bob Herm', 'Test Corp', 'Tampa', 'FL'],
// 	['James Houston', 'Test Corp', 'Dallas', 'TX'],
// ];

// const options = {
// 	filterType: 'checkbox',
// };

const Student = () => {
	return (
		<>
			<div className="container">
				<h1 className="header__big">Student</h1>
				<div className="main__section">
					<div className="group__content">
						<div className="add__button">
							<IconButton
								aria-label="delete"
								sx={{ marginLeft: 2 }}
							>
								<DeleteIcon />
							</IconButton>
							<AddButtonStyled />
						</div>
						<StudentTable />
					</div>
				</div>
			</div>
		</>
	);
};

export default Student;
