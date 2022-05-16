import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const PopUpGroup = ({ closePopUp }) => {
	const [level, setLevel] = React.useState('');
	const [addGroup, setAddGroup] = useState(false);

	const handleChange = event => {
		setLevel(event.target.value);
	};

	return (
		<>
			<div id="popup" className="popup">
				<div className="dialog__close">
					<button
						onClick={() => closePopUp(false)}
						className="close__icon"
					>
						<CloseIcon />
					</button>
				</div>
				<div className="popup__container">
					{!addGroup && (
						<div>
							<div className="header__medium">
								Групп нэмэх хэсэг
							</div>
							<div className="popup__wrapper">
								<input
									id="student__name"
									type="text"
									placeholder="Групп Нэр"
									required
								/>
								{/* <input
							id="student__name"
							type="text"
							placeholder="Групп Нэр"
							required
						/> */}
								<Box sx={{ minWidth: 120 }}>
									<FormControl fullWidth>
										<InputLabel id="demo-simple-select-label">
											Түвшин
										</InputLabel>

										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={level}
											label="Түвшин"
											onChange={handleChange}
										>
											<MenuItem value={10}>
												1
											</MenuItem>
											<MenuItem value={20}>
												2
											</MenuItem>
											<MenuItem value={30}>
												3
											</MenuItem>
										</Select>
									</FormControl>
								</Box>
							</div>
							<div className="dialog__buttons">
								<button
									onClick={() => closePopUp(false)}
									className="confirm__btn text__big"
								>
									Болих
								</button>
								<button
									className="confirm__btn text__big"
									onClick={() => setAddGroup(true)}
								>
									Тийм
								</button>
							</div>
						</div>
					)}
					{addGroup && (
						<div>
							<div className="header__medium">
								Итгэлтэй байна уу?
							</div>
							<div className="dialog__buttons">
								<button
									onClick={() => closePopUp(false)}
									className="confirm__btn text__big"
								>
									Үгүй
								</button>
								<button
									className="confirm__btn text__big"
									onClick={() => setAddGroup(true)}
								>
									Тийм
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default PopUpGroup;
