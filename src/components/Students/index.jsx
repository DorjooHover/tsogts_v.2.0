import { async } from '@firebase/util';
import {
	onSnapshot,
	query,
	where,
	collection,
	doc,
	getDoc,
	collectionGroup,
	getDocs,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../config/Auth';
import { db } from '../../../config/firebase';
import Header from '../Header';
import Navbar from '../Navbar';
import Lesson from '../Lesson';
import { Box } from '@mui/material';
const Student = () => {
	const { currentUser } = useAuth();
	const [group, setGroup] = useState();
	const [lesson, setLesson] = useState();
	const [category, setCategory] = useState();
	const [nav, setNav] = useState('home');
	const [lessonData, setLessonData] = useState({
		lid: '',
		level_id: null,
		index: null,
		cid: '',
	});
	useEffect(() => {
		const fetchData = async () => {
			const cateDoc = collection(db, 'categories');
			const cateQuery = query(
				cateDoc,
				where('students', 'array-contains', currentUser.uid)
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
					setLessonData(lessonsData => ({
						...lessonData,
						cid: categories[0].cid,
					}));
				});
			});
			const groupDoc = collection(db, 'groups');
			const groupQuery = query(
				groupDoc,
				where('students', 'array-contains', currentUser.uid)
			);
			const groupSnap = onSnapshot(groupQuery, queryGroup => {
				queryGroup.docs.map(g => {

					setLessonData(lessonData => ({
						...lessonData, level_id: g.data().level_id
					}))
				});
			});

			// const lessonQuery = query(collection(db, 'groups/' + userSnap.data().groups[0] + '/lessons'), where('level_id', '<=', qq.data().level_id))
			// onSnapshot(lessonQuery, (queryLesson) => {
			//     setLesson(queryLesson.docs.map((l) => ({...l.data(), lessonId: l.id})))
			// })
		};
		fetchData();
	}, []);

	return (
		<Box width={'100%'}>
			<Navbar user={'student'} category={category} setNav={setNav} />

			{nav == 'home' && lesson && (
				<>
					<Lesson
						setLessonData={setLessonData}
						lessonData={lessonData}
						lesson={lesson}
						group={group}
						category={category}
					/>
				</>
			)}
		</Box>
	);
};
export default Student;
