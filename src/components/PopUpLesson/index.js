import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Selectlevel from '../LessonsComp/selectLevel';
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from '@mui/material';
import { useAuth } from '../../../config/Auth';
import {
	addDoc,
	collection,
	onSnapshot,
	query,
	serverTimestamp,
	where,
} from 'firebase/firestore';
import { db, storage } from '../../../config/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
const PopUpLesson = ({ closePopUp }) => {
	const [upload, setUpload] = useState(false);
	const [filterByLevel, setFilterByLevel] = useState('');
	const { currentUser } = useAuth();
	const [category, setCategory] = useState();
	const [progress, setProgress] = useState(0);
	const [cancel, setCancel] = useState(false);
	const [lesson, setLesson] = useState({ name: '', id: '' });
	useEffect(() => {
		const cateDoc = collection(db, 'categories');
		const cateQuery = query(
			cateDoc,
			where('teachers', 'array-contains', currentUser.uid)
		);
		onSnapshot(cateQuery, queryCate => {
			setCategory(
				queryCate.docs.map(qc => ({
					...qc.data(),
					cid: qc.id,
				}))
			);
		});
	}, []);
	const formHandler = e => {
		e.preventDefault();
		setCancel(false);
		setUpload(true);
		const file = e.target[3].files[0];
		uploadFiles(file);
	};

	const uploadFiles = file => {
		if (!file && !category && cancel) return;
		const storageRef = ref(storage, `/files/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on(
			'state_changed',
			snapshot => {
				if (!cancel) {
					const prog = Math.round(
						(snapshot.bytesTransferred /
							snapshot.totalBytes) *
							100
					);
					setProgress(prog);
					switch (snapshot.state) {
						case 'paused':
							console.log('upload is paused');
							break;
						case 'running':
							console.log('Upload is running');
							break;
					}
				}
			},
			err => console.log(err),
			() => {
				getDownloadURL(uploadTask.snapshot.ref)
					.then(async url => {
						const lessonDoc = collection(
							db,
							'categories/' + category[0].cid + '/lessons'
						);
						const lessonSnap = await addDoc(lessonDoc, {
							level_id: filterByLevel,
							name: lesson.name,
							id: parseInt(lesson.id),
							video: url,
							teacherId: currentUser.uid,
							timestamp: serverTimestamp(),
						});
					})
					.finally(() => {
						setUpload(false);
						setLesson(lesson => ({ name: '', id: '' }));
						setFilterByLevel('');
						setProgress(0);
					});
			}
		);
	};

	return (
		<>
			<div id="popup" className="popup">
				<div className="dialog__close">
					{!upload && (
						<button
							onClick={() => closePopUp(false)}
							className="close__icon"
						>
							<CloseIcon />
						</button>
					)}
					{upload && (
						<button
							onClick={() => {
								setCancel(true);
								setUpload(false);
								setProgress(0);
							}}
							className="close__icon"
						>
							<CloseIcon />
						</button>
					)}
				</div>
				<div className="popup__container">
					<div className="header__medium">
						Хичээл нэмэх хэсэг
					</div>
					{!upload && (
						<div>
							<form
								className="popup__wrapper"
								onSubmit={formHandler}
							>
								<input
									id="student__name"
									type="text"
									placeholder="Хичээлийн дугаар"
									required
									onChange={e =>
										setLesson(lesson => ({
											...lesson,
											id: e.target.value,
										}))
									}
									value={lesson.id}
								/>
								<input
									id="student__name"
									type="text"
									placeholder="Хичээлийн нэр"
									required
									onChange={e =>
										setLesson(lesson => ({
											...lesson,
											name: e.target.value,
										}))
									}
									value={lesson.name}
								/>
								<select
									name="level"
									id="level"
									onChange={e =>
										setFilterByLevel(
											e.target.value
										)
									}
								>
									{category && (
										<>
											{category[0].levels.map(
												(l, index) => {
													return (
														<option
															key={
																index
															}
															value={
																index
															}
														>
															{
																l.level
															}
														</option>
													);
												}
											)}
										</>
									)}
								</select>

								<input
									accept="video/*"
									id="lesson__video"
									type="file"
								/>
								<div className="dialog__buttons">
									<button
										onClick={() =>
											closePopUp(false)
										}
										className="confirm__btn text__big"
									>
										Буцах
									</button>
									<button
										className="confirm__btn text__big"
										type="submit"
									>
										Нэмэх
									</button>
								</div>
							</form>
						</div>
					)}
					{upload && (
						<div>
							<Box
								sx={{
									width: '100%',
									height: 30,
									mt: 3,
									position: 'relative',
									backgroundColor: '#dfdfe1',
								}}
							>
								<Box
									sx={{
										width: `${progress}%`,
										height: 30,
										position: 'absolute',
										backgroundColor: '#11101b',
										transition: ' 0.3s all ease',
										zIndex: '10',
									}}
								></Box>
								<Typography
									variant="h5"
									sx={{
										color: '#fff',
										position: 'absolute',
										zIndex: '20',
										top: '50%',
										left: '50%',
										transform:
											'translate(-50%, -50%)',
									}}
								>
									{progress}%
								</Typography>
							</Box>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default PopUpLesson;
