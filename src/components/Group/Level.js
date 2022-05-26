import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '../DialogBtn/Dialog';

export default function SelectSmall({ category, group, gid }) {
	const [level, setLevel] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);

	const handleChange = event => {
		setLevel(event.target.value);
		setOpenDialog(true);
	};
	return (
		<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
			<InputLabel id="demo-select-small">
				{category.levels[group.level_id].level}
			</InputLabel>
			<Select
				labelId="demo-select-small"
				id="demo-select-small"
				value={level}
				label="Level"
				onChange={handleChange}
			>
				{category.levels.map((c, index) => {
					return (
						<MenuItem value={index} key={c.cid}>
							{c.level}
						</MenuItem>
					);
				})}
			</Select>
			{level !== null && openDialog && (
				<>
					<Dialog
						closeDialog={setOpenDialog}
						level={level}
						gid={gid}
						text={'Та түвшин сонгохдоо итгэлтэй байна уу?'}
						act={'updateLevel'}
					/>
				</>
			)}
		</FormControl>
	);
}
