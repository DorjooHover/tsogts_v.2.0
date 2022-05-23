import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import {
	collection,
	deleteDoc,
	doc,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { db } from '../../../config/firebase';
// import Student from '../Student';
// import EnhancedTable from '../student/StudentTable';

const PopUpAdd = ({
	closePopUp,
	act,
	user,
	selected,
	setSelected,
	isAdd,
	teachers,
	students,
}) => {
	const [addStudent, setAddStudent] = useState(false);
	const [removeTeacherId, setRemoveTeacherId] = useState();
	const addTeacher = async () => {
		selected.map(async s => {
			students.map(async st => {
				if (st.email == s) {
					const userDoc = doc(db, 'users', st.sid);
					const userSnap = await updateDoc(userDoc, {
						isTeacher: true,
					});
				}
			});
		});
		setAddStudent(true);
		setSelected([]);
		closePopUp(false);
	};
	const deleteStudent = async () => {
		selected.map(async s => {
			students.map(async st => {
				if (st.email == s) {
					console.log(st.sid);
					await deleteDoc(doc(db, 'users', st.sid));
				}
			});
		});
		setAddStudent(true);
		setSelected([]);
		closePopUp(false);
	};
	const deleteTeacher = async () => {
		selected.map(s => {
			teachers.map(async t => {
				if (t.email == s) {
					const userDoc = doc(db, 'users', t.sid);
					const userSnap = await updateDoc(userDoc, {
						isTeacher: false,
					});
				}
			});
		});
		setAddStudent(true);
		setSelected([]);
		closePopUp(false);
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
					{!addStudent && (
						<>
							{user == 'admin' && (
								<div>
									<div className="header__medium">
										{isAdd && (
											<>Багш нэмэх хэсэг</>
										)}
										{!isAdd &&
											act ==
												'removeStudent' && (
												<>
													Сурагч устгах
													хэсэг
												</>
											)}
										{!isAdd &&
											act ==
												'removeTeacher' && (
												<>
													Багш устгах
													хэсэг
												</>
											)}
									</div>

									<List
										sx={{
											width: '100%',
											maxWidth: 360,
											bgcolor: 'background.paper',
											position: 'relative',
											overflow: 'auto',
											maxHeight: 300,
											'& ul': { padding: 0 },
										}}
										subheader={<li />}
									>
										{selected &&
											selected.map(
												(item, index) => {
													{
														return (
															<ListItem
																key={
																	item
																}
															>
																<ListItemText
																	primary={`${item}`}
																/>
															</ListItem>
														);
													}
												}
											)}
									</List>

									<div className="dialog__buttons">
										<button
											onClick={() =>
												closePopUp(false)
											}
											className="confirm__btn text__big dialog"
										>
											Буцах
										</button>
										{isAdd && (
											<button
												className="confirm__btn text__big dialog"
												onClick={() =>
													setAddStudent(
														true
													)
												}
											>
												Нэмэх
											</button>
										)}
										{!isAdd && (
											<button
												className="confirm__btn text__big dialog"
												onClick={() =>
													setAddStudent(
														true
													)
												}
											>
												Устгах
											</button>
										)}
									</div>
								</div>
							)}
						</>
					)}
					{addStudent && (
						<div>
							<div className="header__medium">
								Итгэлтэй байна уу?
							</div>
							<div className="dialog__buttons">
								<button
									onClick={() => closePopUp(false)}
									className="confirm__btn text__big dialog"
								>
									Үгүй
								</button>
								{user == 'admin' && (
									<>
										{isAdd && (
											<button
												className="confirm__btn text__big dialog"
												onClick={() => {
													addTeacher();
												}}
											>
												Тийм
											</button>
										)}
										{!isAdd && (
											<>
												{act ==
													'removeTeacher' && (
													<button
														className="confirm__btn text__big dialog"
														onClick={() => {
															deleteTeacher();
														}}
													>
														Тийм
													</button>
												)}
												{act ==
													'removeStudent' && (
													<button
														className="confirm__btn text__big dialog"
														onClick={() => {
															deleteStudent();
														}}
													>
														Тийм
													</button>
												)}
											</>
										)}
									</>
								)}
								{user != 'admin' && (
									<button
										className="confirm__btn text__big dialog"
										onClick={() =>
											setAddStudent(true)
										}
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

export default PopUpAdd;
