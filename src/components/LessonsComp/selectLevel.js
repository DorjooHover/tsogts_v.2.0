import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Selectlevel({
	category,
	setFilterByLevel,
	filterByLevel,
}) {
	const handleChange = event => {
		setFilterByLevel(event.target.value);
	};

	return (
		<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
			<InputLabel id="demo-select-small">Түвшин</InputLabel>
			<Select
				labelId="demo-select-small"
				id="demo-select-small"
				value={filterByLevel}
				label="Түвшин"
				onChange={handleChange}
			>
				<MenuItem value={-1}>All</MenuItem>;
				{category.levels.map((l, index) => {
					return <MenuItem value={index}>{l.level}</MenuItem>;
				})}
			</Select>
		</FormControl>
	);
}
