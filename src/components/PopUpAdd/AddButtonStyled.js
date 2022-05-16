import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import PopUpAdd from '.';

const AddButtonStyled = ({}) => {
	const [openPopUp, setOpenPopUp] = useState(false);
	console.log('hi');

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
				onClick={() => setOpenPopUp(true)}
			>
				<AddIcon />
				<p className="text__big">Нэмэх</p>
			</IconButton>
			{openPopUp && <PopUpAdd closePopUp={setOpenPopUp} />}
		</>
	);
};

export default AddButtonStyled;
