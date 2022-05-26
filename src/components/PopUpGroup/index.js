import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { Alert, Stack } from '@mui/material';
import { useAuth } from '../../../config/Auth';

const PopUpGroup = ({ closePopUp, category }) => {
	const [level, setLevel] = React.useState(null);
	const [addGroup, setAddGroup] = useState(false);
	const [groupData, setGroupData] = useState({ name: '', id: null });
	const [alert, setAlert] = useState({ type: '', message: '' });
	const handleChange = event => {
		setLevel(event.target.value);
	};
	console.log(category.cid);

	const { currentUser } = useAuth();
	const addGroups = async e => {
		e.preventDefault();
		if (groupData.id !== null && groupData.name !== '' && level !== '') {
			const groupRef = await addDoc(collection(db, 'groups'), {
				name: groupData.name,
				id: groupData.id,
				level_id: level,
				teacherId: currentUser.uid,
				categoryId: category.cid,
				students: [],
				timestamp: serverTimestamp(),
			}).catch(err => console.log(err));
			console.log(groupRef);
			console.log(
				level,
				groupData.name,
				groupData.id,
				currentUser.uid
			);
			setAlert(alert => ({
				...alert,
				type: 'success',
				message: 'Амжилттай грүпп нэмлээ.',
			}));
			closePopUp(false);
		} else {
			setAlert(alert => ({
				...alert,
				type: 'warning',
				message: 'Мэдээлэл дутуу байна.',
			}));
			setAddGroup(false);
		}
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
									onChange={e =>
										setGroupData(groupData => ({
											...groupData,
											name: e.target.value,
										}))
									}
									value={groupData.name}
								/>
								<input
									id="student__name"
									type="text"
									placeholder="Групп Дугаар"
									required
									onChange={e =>
										setGroupData(groupData => ({
											...groupData,
											id: e.target.value,
										}))
									}
									// value={groupData.id}
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
											onChange={e =>
												setLevel(
													e.target.value
												)
											}
										>
											{category.levels.map(
												(level, index) => {
													return (
														<MenuItem
															value={
																index
															}
															key={
																level.cid
															}
														>
															{
																level.level
															}
														</MenuItem>
													);
												}
											)}
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
							{alert.type != '' && (
								<>
									<Stack
										sx={{
											width: '100%',
											// display: 'none'
											mt: 2,
										}}
									>
										<Alert severity={alert.type}>
											{alert.message}
										</Alert>
									</Stack>
								</>
							)}
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
									onClick={addGroups}
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
