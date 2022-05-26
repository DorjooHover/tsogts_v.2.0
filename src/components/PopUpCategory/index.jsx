import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
	Button,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Box,
	TextField,
} from '@mui/material';
import {
	addDoc,
	collection,
	doc,
	onSnapshot,
	query,
	serverTimestamp,
	updateDoc,
	where,
} from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { Alert, Grid, Stack } from '@mui/material';
import { useAuth } from '../../../config/Auth';
import TeacherTable from '../teachers/TeacherTable';

const PopUpCategory = ({
	closePopUp,
	category,
	act,
	level,
	setLevel,
	categoryData,
	setCategoryData,
	selected,
	setSelected,
	teacher,
	setTeacher,
}) => {
	const [addCategories, setAddCategories] = useState(false);
	const [updateCategories, setUpdateCategories] = useState(false);
	const [alert, setAlert] = useState({ type: '', message: '' });
	const handleChange = event => {
		setLevel(event.target.value);
	};
	const [chooseTeacher, setChooseTeacher] = useState(false);
	const { currentUser } = useAuth();

	useEffect(() => {
		const fetchData = () => {
			const teacherDoc = collection(db, 'users');
			const teacherQuery = query(
				teacherDoc,
				where('isTeacher', '==', true),
				where('isAdmin', '==', false)
			);
			const teacherSnap = onSnapshot(teacherQuery, queryTeacher => {
				setTeacher(
					queryTeacher.docs.map(t => ({
						...t.data(),
						tid: t.id,
					}))
				);
			});
		};
		return () => fetchData();
	}, []);
	const addCategory = async e => {
		e.preventDefault();

		let teachers = [];
		let levels = [];
		if (selected.length != 0) {
			selected.map(s => {
				const res = teacher.find(t => t.email == s);
				teachers.push(res.tid);
			});
			Object.values(level).map((l, index) => {
				if (l != '') levels.push({ level: l });
			});
			if (teachers.length != 0 && level.length != 0) {
				const cateDoc = await addDoc(collection(db, 'categories'), {
					name: categoryData.name,
					teachers: teachers,
					students: [],
					levels: levels,
					timestamp: serverTimestamp(),
				});
			}
			closePopUp(false);
			setCategoryData(s => ({ ...s, name: '' }));
			setLevel(level => ({
				...level,
				l_0: '',
				l_1: '',
				l_2: '',
				l_3: '',
				l_4: '',
				l_5: '',
				l_6: '',
				l_7: '',
				l_8: '',
				l_9: '',
			}));
			setSelected(selected => []);
			setAddCategories(false);
		}
	};

	const updateCategory = async e => {
		e.preventDefault();
		let teachers = [];
		let levels = [];
		if (selected.length != 0) {
			selected.map(s => {
				const res = teacher.find(t => t.email == s);
				teachers.push(res.tid);
			});
			Object.values(level).map((l, index) => {
				if (l != '') levels.push({ level: l });
			});
			if (teachers.length != 0 && levels.length != 0) {
				const cateDoc = doc(db, 'categories', category.cid);
				const cateQuery = await updateDoc(cateDoc, {
					name: categoryData.name,
					teachers: teachers,
					students: [],
					levels: levels,
					timestamp: serverTimestamp(),
				});
			}
			closePopUp(false);
			setCategoryData(s => ({ ...s, name: '' }));
			setLevel(level => ({
				...level,
				l_0: '',
				l_1: '',
				l_2: '',
				l_3: '',
				l_4: '',
				l_5: '',
				l_6: '',
				l_7: '',
				l_8: '',
				l_9: '',
			}));
			setSelected(selected => []);
			setUpdateCategories(false);
		}
	};
	const handleCancel = () => {
		closePopUp(false);
		setCategoryData(s => ({ ...s, name: '' }));
		setLevel(level => ({
			...level,
			l_0: '',
			l_1: '',
			l_2: '',
			l_3: '',
			l_4: '',
			l_5: '',
			l_6: '',
			l_7: '',
			l_8: '',
			l_9: '',
		}));
		setSelected(selected => []);
		setUpdateCategories(false);
		setAddCategories(false);
	};

	return (
		<>
			<div id="popup_student" className="popup">
				<div className="dialog__close">
					<button
						onClick={() => handleCancel()}
						className="close__icon"
					>
						<CloseIcon />
					</button>
				</div>
				<div className="popup__container">
					{!chooseTeacher &&
						!updateCategories &&
						!addCategories && (
							<div>
								<div className="header__medium">
									{act == 'addCategory' && (
										<>Бүлэг нэмэх хэсэг</>
									)}
									{act == 'updateCategory' && (
										<>Бүлэг засах хэсэг</>
									)}
								</div>
								<div className="popup__wrapper">
									<input
										id="student__name"
										type="text"
										placeholder="Бүлэг Нэр"
										required
										onChange={e =>
											setCategoryData(
												categoryData => ({
													...categoryData,
													name: e.target
														.value,
												})
											)
										}
										value={categoryData.name}
									/>
									<label htmlFor="level">
										Levels
									</label>
									<Grid
										container
										spacing={2}
										mt={1}
										mb={2}
									>
										<Grid item xs={4}>
											<TextField
												id="outlined-textarea"
												label="01"
												placeholder="01"
												multiline
												onChange={e =>
													setLevel(
														level => ({
															...level,
															l_0: e
																.target
																.value,
														})
													)
												}
												value={level.l_0}
											/>
										</Grid>
										<Grid item xs={4}>
											<TextField
												id="outlined-textarea"
												label="02"
												placeholder="02"
												multiline
												onChange={e =>
													setLevel(
														level => ({
															...level,
															l_1: e
																.target
																.value,
														})
													)
												}
												value={level.l_1}
											/>
										</Grid>
										<Grid item xs={4}>
											<TextField
												id="outlined-textarea"
												label="03"
												placeholder="03"
												multiline
												onChange={e =>
													setLevel(
														level => ({
															...level,
															l_2: e
																.target
																.value,
														})
													)
												}
												value={level.l_2}
											/>
										</Grid>
										<Grid item xs={4}>
											<TextField
												id="outlined-textarea"
												label="04"
												placeholder="04"
												multiline
												onChange={e =>
													setLevel(
														level => ({
															...level,
															l_3: e
																.target
																.value,
														})
													)
												}
												value={level.l_3}
											/>
										</Grid>
										<Grid item xs={4}>
											<TextField
												id="outlined-textarea"
												label="05"
												placeholder="05"
												multiline
												onChange={e =>
													setLevel(
														level => ({
															...level,
															l_4: e
																.target
																.value,
														})
													)
												}
												value={level.l_4}
											/>
										</Grid>
										<Grid item xs={4}>
											<TextField
												id="outlined-textarea"
												label="06"
												placeholder="06"
												multiline
												onChange={e =>
													setLevel(
														level => ({
															...level,
															l_5: e
																.target
																.value,
														})
													)
												}
												value={level.l_5}
											/>
										</Grid>
										<Grid item xs={4}>
											<TextField
												id="outlined-textarea"
												label="07"
												placeholder="07"
												multiline
												onChange={e =>
													setLevel(
														level => ({
															...level,
															l_6: e
																.target
																.value,
														})
													)
												}
												value={level.l_6}
											/>
										</Grid>
										<Grid item xs={4}>
											<TextField
												id="outlined-textarea"
												label="08"
												placeholder="08"
												multiline
												onChange={e =>
													setLevel(
														level => ({
															...level,
															l_7: e
																.target
																.value,
														})
													)
												}
												value={level.l_7}
											/>
										</Grid>
										<Grid item xs={4}>
											<TextField
												id="outlined-textarea"
												label="09"
												placeholder="09"
												multiline
												onChange={e =>
													setLevel(
														level => ({
															...level,
															l_8: e
																.target
																.value,
														})
													)
												}
												value={level.l_8}
											/>
										</Grid>
									</Grid>
									<Button
										variant="contained"
										onClick={() => {
											setChooseTeacher(true);
										}}
									>
										Багш Сонгох
									</Button>
								</div>

								<div className="dialog__buttons">
									<button
										onClick={() => handleCancel()}
										className="confirm__btn text__big"
									>
										Болих
									</button>
									{act == 'addCategory' && (
										<button
											className="confirm__btn text__big"
											onClick={() =>
												setAddCategories(
													true
												)
											}
										>
											Тийм
										</button>
									)}
									{act == 'updateCategory' && (
										<button
											className="confirm__btn text__big"
											onClick={() =>
												setUpdateCategories(
													true
												)
											}
										>
											Тийм
										</button>
									)}
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
											<Alert
												severity={
													alert.type
												}
											>
												{alert.message}
											</Alert>
										</Stack>
									</>
								)}
							</div>
						)}
					{chooseTeacher && !addCategories && (
						<>
							<TeacherTable
								selected={selected}
								setSelected={setSelected}
								teachers={teacher}
							/>
							<Button
								variant="contained"
								onClick={() => {
									setChooseTeacher(false);
								}}
							>
								Багш Сонгож дууслаа.
							</Button>
						</>
					)}
					{!chooseTeacher &&
						(addCategories || updateCategories) && (
							<div>
								<div className="header__medium">
									Итгэлтэй байна уу?
								</div>
								<div className="dialog__buttons">
									<button
										onClick={() =>
											closePopUp(false)
										}
										className="confirm__btn text__big"
									>
										Үгүй
									</button>
									{!updateCategories && (
										<button
											className="confirm__btn text__big"
											onClick={addCategory}
										>
											Тийм
										</button>
									)}
									{updateCategories && (
										<button
											className="confirm__btn text__big"
											onClick={updateCategory}
										>
											Тийм
										</button>
									)}
								</div>
							</div>
						)}
				</div>
			</div>
		</>
	);
};

export default PopUpCategory;
