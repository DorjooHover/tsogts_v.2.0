import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import PopUpAdd from '.';
import Student from '../Student';
import StudentAdd from './studentAdd';
const AddButtonStyled = ({
	act,
	user,
	selected,
	setSelected,
	students,
	action,
	groupData,
}) => {
	const [openPopUp, setOpenPopUp] = useState(false);
	return (
		<>
			<IconButton
				aria-label="add"
				sx={{
					marginLeft: 2,
					borderRadius: 5,
					display: 'flex',
					flexDirection: 'row',
				}}
				onClick={() => {
					setOpenPopUp(true);
				}}
			>
				<AddIcon />
				<p className="text__big">Нэмэх</p>
			</IconButton>
			{/* <Student /> */}

			{openPopUp && action != 'addStudentToGroup' && (
				<PopUpAdd
					closePopUp={setOpenPopUp}
					act={act}
					user={user}
					selected={selected}
					setSelected={setSelected}
					isAdd={true}
					students={students}
				/>
			)}
			{openPopUp && action == 'addStudentToGroup' && (
				<StudentAdd
					closePopUp={setOpenPopUp}
					act={act}
					selected={selected}
					setSelected={setSelected}
					isAdd={true}
					students={students}
					groupData={groupData}
				/>
			)}
		</>
	);
};

export default AddButtonStyled;
