import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import PopUpLesson from '.';

const AddButtonLesson = ({ category }) => {
	const [openPopUpLesson, setOpenPopUpLesson] = useState(false);

	return (
		<>
			<IconButton
				aria-label="add"
				sx={{
					marginLeft: 2,
					borderRadius: 3,
					display: 'flex',
					flexDirection: 'row',
				}}
				onClick={() => setOpenPopUpLesson(true)}
			>
				<AddIcon />
				<p className="text__big">Нэмэх</p>
			</IconButton>
			{openPopUpLesson && (
				<PopUpLesson
					closePopUp={setOpenPopUpLesson}
					// category={category[0]}
				/>
			)}
		</>
	);
};

export default AddButtonLesson;
