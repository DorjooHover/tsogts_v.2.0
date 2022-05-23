import React, { useState } from 'react';
import Dialog from './Dialog';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const DialogBtn = ({ gid, act, lid , cid}) => {
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
			{openDialog && (
				<Dialog
					closeDialog={setOpenDialog}
					text={'Грүпп устгахдаа итгэлтэй байна уу?'}
					act={act}
					gid={gid}
					lid={lid}
					cid={cid}
				/>
			)}
		</>
	);
};

export default DialogBtn;
