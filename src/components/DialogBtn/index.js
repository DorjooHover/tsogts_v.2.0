import React, { useState } from 'react';
import Dialog from './Dialog';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const DialogBtn = () => {
	const [openDialog, setOpenDialog] = useState(false);

	return (
		<>
			<IconButton
				aria-label="delete"
				sx={{ marginLeft: 2 }}
				onClick={() => {
					setOpenDialog(true);
				}}
			>
				<DeleteIcon />
			</IconButton>
			{openDialog && <Dialog closeDialog={setOpenDialog} />}
		</>
	);
};

export default DialogBtn;
