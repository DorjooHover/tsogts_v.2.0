import {
	onSnapshot,
	query,
	where,
	collection,
	doc,
	getDoc,
	collectionGroup,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	serverTimestamp,
	arrayRemove,
	arrayUnion,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../config/Auth';
import { db, storage } from '../../../config/firebase';
import TeacherHeader from '../Header/Teacher';
import Navbar from '../Navbar';

import Group from '../Group';
import Lesson from '../Lesson';
import LessonsComp from '../LessonsComp';
import StudentPart from '../Students';

import GroupStudentsTable from '../Group/GroupStudent';
import { Box } from '@mui/material';
const Teacher = () => {
	const { currentUser } = useAuth();
	const [group, setGroup] = useState();
	const [lesson, setLesson] = useState();
	const [category, setCategory] = useState();
	const [level, setLevel] = useState();
	const [user, setUser] = useState();
	const [comment, setComment] = useState();
	const [student, setStudent] = useState();
	const [loading, setLoading] = useState(false);
	const [groupData, setGroupData] = useState({ gid: '' });
	const [lessonData, setLessonData] = useState({
		lid: '',
		level_id: null,
		index: null,
		cid: '',
	});
	const [addUpdateGroup, setAddUpdateGroup] = useState({
		name: '',
		level: '',
		level_id: null,
	});
	const [effectStudentToGroup, setEffectStudentToGroup] = useState([
		'asdf',
		'asd',
	]);
	const [nav, setNav] = useState('home');
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		const fetchData = async () => {
			const groupDoc = collection(db, 'groups');
			const groupQuery = query(
				groupDoc,
				where('teacherId', '==', currentUser.uid)
			);
			const groupSnap = onSnapshot(groupQuery, queryGroup => {
				setGroup(
					queryGroup.docs.map(g => ({ ...g.data(), gid: g.id }))
				);
			});
			const cateDoc = collection(db, 'categories');
			const cateQuery = query(
				cateDoc,
				where('teachers', 'array-contains', currentUser.uid)
			);
			const cateSnap = onSnapshot(cateQuery, queryCate => {
				let categories = [];
				let lessons = [];
				queryCate.docs.map(c => {
					categories.push({ ...c.data(), cid: c.id });
					const lessonDoc = collection(
						db,
						'categories/' + c.id + '/lessons'
					);
					const lessonSnap = onSnapshot(
						lessonDoc,
						queryLesson => {
							queryLesson.docs.map(l => {
								lessons.push({
									...l.data(),
									lid: l.id,
									cid: c.id,
								});
								setLesson(lesson => ({
									...lesson,
									lessons,
								}));
							});
						}
					);
					setCategory(categories);
				});
			});
		};
		fetchData();
	}, []);

	return (
		<Box width={'100%'}>
			{group && category && lesson && (
				<>
					<Navbar
						category={category}
						user="teacher"
						setNav={setNav}
					/>
					{nav == 'home' && (
						<TeacherHeader
							group={group}
							category={category}
							lesson={lesson}
							setNav={setNav}
							setLessonData={setLessonData}
						/>
					)}
					{nav == 'group' && (
						<Group
							group={group}
							category={category}
							user={'teacher'}
							setNav={setNav}
							setGroupData={setGroupData}
							groupData={groupData}
						/>
					)}

					{nav == 'lessons' && (
						<LessonsComp
							lesson={lesson}
							category={category}
							setNav={setNav}
							setLessonData={setLessonData}
						/>
					)}

					{nav == 'students' &&
						groupData.gid != '' &&
						groupData.cid != '' && (
							<>
								{category.map(c => {
									if (c.cid == groupData.cid) {
										return (
											<GroupStudentsTable
												groupData={
													groupData
												}
												category={c}
												setGroupData={
													setGroupData
												}
											/>
										);
									}
								})}
							</>
						)}
					{nav == 'lesson' &&
						(lessonData.lid != '' ||
							lessonData.level_id != null) && (
							<>
								<Lesson
									lessonData={lessonData}
									lesson={lesson}
									setLessonData={setLessonData}
								/>
							</>
						)}
				</>
			)}
		</Box>
	);
};
export default Teacher;
