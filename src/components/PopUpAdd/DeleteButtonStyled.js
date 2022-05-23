import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import PopUpAdd from '.';
import Student from '../Student';
import { Delete } from '@mui/icons-material';
import StudentAdd from './studentAdd';

const DeleteButtonStyled = ({
	act,
	user,
	selected,
	setSelected,
	teachers,
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
				<Delete />
				<p className="text__big">Устгах</p>
			</IconButton>
			{/* <Student /> */}

			{openPopUp && (
				<PopUpAdd
					closePopUp={setOpenPopUp}
					act={act}
					user={user}
					selected={selected}
					setSelected={setSelected}
					isAdd={false}
					teachers={teachers}
					students={students}
				/>
			)}
			{openPopUp && action == 'removeStudentFromGroup' && (
				<StudentAdd
					closePopUp={setOpenPopUp}
					act={act}
					selected={selected}
					setSelected={setSelected}
					isAdd={false}
					students={students}
					groupData={groupData}
				/>
			)}
		</>
	);
};

export default DeleteButtonStyled;
