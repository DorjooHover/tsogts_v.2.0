import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import {
	arrayRemove,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { db } from '../../../config/firebase';
import StudentsTable from '../Student/StudentTable';
// import Student from '../Student';
// import EnhancedTable from '../student/StudentTable';

const StudentAdd = ({
	closePopUp,
	act,
	user,
	selected,
	setSelected,
	isAdd,
	groupData,
}) => {
	const [addStudent, setAddStudent] = useState(false);
	const [removeTeacherId, setRemoveTeacherId] = useState();
	const [selectedStudent, setSelectedStudent] = useState([]);
	const [student, setStudent] = useState();

	useEffect(() => {
		const studentDoc = collection(db, 'users');
		const studentQuery = query(
			studentDoc,
			where('isTeacher', '==', false),
			where('isAdmin', '==', false)
		);
		const studentSnap = onSnapshot(studentQuery, queryStudent => {
			setStudent(
				queryStudent.docs.map(s => ({
					...s.data(),
					sid: s.id,
				}))
			);
		});
		return studentSnap;
	}, []);
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

	const addToGroupStudent = async () => {
		if (groupData.gid != '' && groupData.cid != '') {
			selectedStudent.map(s => {
				student.map(async st => {
					if (st.email == s) {
						const groupDoc = doc(db, 'groups', groupData.gid);
						const groupSnap = await updateDoc(groupDoc, {
							students: arrayUnion(st.sid),
						});
						const cateDoc = doc(
							db,
							'categories',
							groupData.cid
						);
						const cateSnap = await updateDoc(cateDoc, {
							students: arrayUnion(st.sid),
						});
					}
				});
			});
		}
		setAddStudent(true);
		setSelectedStudent([]);
		closePopUp(false);
	};
	const removeFromGroupStudent = async () => {
		if (groupData.gid != '' && groupData.cid != '') {
			selected.map(s => {
				student.map(async st => {
					if (st.email == s) {
						const groupDoc = doc(db, 'groups', groupData.gid);
						const groupSnap = await updateDoc(groupDoc, {
							students: arrayRemove(st.sid),
						});
						const cateDoc = doc(
							db,
							'categories',
							groupData.cid
						);
						const cateSnap = await updateDoc(cateDoc, {
							students: arrayRemove(st.sid),
						});
					}
				});
			});
		}
		setAddStudent(true);
		setSelected([]);
		closePopUp(false);
	};

	return (
		<>
			<div id="popup_student" className="popup">
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
							<div>
								<div className="header__medium">
									{isAdd && (
										<>
											Сурагч грүпп руу нэмэх
											хэсэг
										</>
									)}
									{!isAdd && (
										<>
											Сурагч грүппээс устгах
											хэсэг
										</>
									)}
								</div>

								<List
									sx={{
										width: '100%',
										// maxWidth: 360,
										bgcolor: 'background.paper',
										position: 'relative',
										overflow: 'auto',
										maxHeight: 600,
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
									{!selected && (
										<StudentsTable
											selected={
												selectedStudent
											}
											setSelected={
												setSelectedStudent
											}
											students={student}
										/>
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
												setAddStudent(true)
											}
										>
											Нэмэх
										</button>
									)}
									{!isAdd && (
										<button
											className="confirm__btn text__big dialog"
											onClick={() =>
												setAddStudent(true)
											}
										>
											Устгах
										</button>
									)}
								</div>
							</div>
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
									<>
										{isAdd && (
											<button
												className="confirm__btn text__big dialog"
												onClick={() => {
													addToGroupStudent();
												}}
											>
												Тийм
											</button>
										)}
										{!isAdd && (
											<button
												className="confirm__btn text__big dialog"
												onClick={() => {
													removeFromGroupStudent();
												}}
											>
												Тийм
											</button>
										)}
									</>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default StudentAdd;
