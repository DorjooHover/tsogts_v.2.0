import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Selectlevel() {
	const [level, setLevel] = React.useState('');

	const handleChange = event => {
		setLevel(event.target.value);
	};

	return (
		<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
			<InputLabel id="demo-select-small">Түвшин</InputLabel>
			<Select
				labelId="demo-select-small"
				id="demo-select-small"
				value={level}
				label="Түвшин"
				onChange={handleChange}
			>
				<MenuItem value=""></MenuItem>
				<MenuItem value={1}>1</MenuItem>
				<MenuItem value={2}>2</MenuItem>
				<MenuItem value={3}>3</MenuItem>
			</Select>
		</FormControl>
	);
}
