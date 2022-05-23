import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import PopUpAdd from '.';

const AddButtonGroup = ({ category }) => {
	const [openPopUpGroup, setOpenPopUpGroup] = useState(false);

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
				onClick={() => setOpenPopUpGroup(true)}
			>
				<AddIcon />
				<p className="text__big">Нэмэх</p>
			</IconButton>
			{openPopUpGroup && (
				<PopUpAdd
					closePopUp={setOpenPopUpGroup}
					category={category}
				/>
			)}
		</>
	);
};

export default AddButtonGroup;
