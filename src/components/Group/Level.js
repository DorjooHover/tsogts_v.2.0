import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall() {
	const [level, setLevel] = React.useState('');

	const handleChange = event => {
		setLevel(event.target.value);
	};

	return (
		<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
			<InputLabel id="demo-select-small">Level</InputLabel>
			<Select
				labelId="demo-select-small"
				id="demo-select-small"
				value={level}
				label="Level"
				onChange={handleChange}
			>
				<MenuItem value={1}>a1</MenuItem>
				<MenuItem value={2}>a2</MenuItem>
				<MenuItem value={3}>a3</MenuItem>
			</Select>
		</FormControl>
	);
}
