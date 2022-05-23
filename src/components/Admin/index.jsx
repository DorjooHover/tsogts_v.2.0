import {
	onSnapshot,
	query,
	where,
	collection,
	doc,
	getDoc,
	collectionGroup,
	getDocs,
	setDoc,
	updateDoc,
	addDoc,
	serverTimestamp,
	arrayRemove,
	arrayUnion,
	deleteDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../config/Auth';
import { db } from '../../../config/firebase';
import Group from '../Group';
import AdminHeader from '../Header/Admin';
import Lesson from '../Lesson';
import AdminLessonsCamp from '../LessonsComp/Admin';
import Navbar from '../Navbar';
import Student from '../Student';
import Teacher from '../teachers';
import GroupStudentsTable from '../Group/GroupStudent';
import { Box } from '@mui/material';
const Admin = () => {
	const { currentUser } = useAuth();
	const [group, setGroup] = useState();
	const [lesson, setLesson] = useState();
	const [category, setCategory] = useState();
	const [level, setLevel] = useState();
	const [user, setUser] = useState();
	const [comment, setComment] = useState();
	const [student, setStudent] = useState();
	const [teacher, setTeacher] = useState();
	const [loading, setLoading] = useState(false);
	const [effectCategory, setEffectCategory] = useState({ name: '' });
	const [effectLevel, setEffectLevel] = useState({ level: '' });
	const [addTeacher, setAddTeacher] = useState(['iUUijYrkzuyUxkljgQMC']);
	const [addLevel, setAddLevel] = useState(['j1']);
	const [effectStudentToGroup, setEffectStudentToGroup] = useState([
		'asdf',
		'asd',
	]);
	const [lessonData, setLessonData] = useState({
		lid: '',
		level_id: null,
		index: null,
		cid: '',
	});
	const [groupData, setGroupData] = useState({
		cid: '',
		gid: '',
		level_id: '',
	});
	const [nav, setNav] = useState('home');
	useEffect(() => {
		const fetchData = async () => {
			const groupDoc = collection(db, 'groups');
			const groupSnap = onSnapshot(groupDoc, queryGroup => {
				setGroup(
					queryGroup.docs.map(g => ({ ...g.data(), gid: g.id }))
				);
			});
			const cateDoc = collection(db, 'categories');
			const cateSnap = onSnapshot(cateDoc, queryCate => {
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
		return () => fetchData();
	}, []);
	const verifyTeacher = async uid => {
		await updateDoc(doc(db, 'users', uid), {
			isTeacher: true,
		});
	};

	const addCategory = async e => {
		e.preventDefault();
		const teacherAdd = await addDoc(collection(db, 'categories'), {
			name: effectCategory.name,
			timestamp: serverTimestamp(),
			teachers: addTeacher,
			students: [],
			levels: addLevel,
		});
	};

	const updateCategory = async e => {
		e.preventDefault();
		await updateDoc(doc(db, 'categories', 'IkrJJbMBMvvEsroJKIt8'), {
			name: effectCategory.name,
			timestamp: serverTimestamp(),
			teachers: addTeacher,
			students: [],
			levels: addLevel,
		});
	};

	const deleteCategory = async cid => {
		console.log(cid);
		await deleteDoc(doc(db, 'categories', cid));
	};

	const addStudentToGroup = async e => {
		e.preventDefault();
		effectStudentToGroup.map(async student => {
			await updateDoc(doc(db, 'groups', '4sX1UN7jQ5coQlTl0lGO'), {
				students: arrayUnion(student),
			});

			await updateDoc(doc(db, 'categories', 'IkrJJbMBMvvEsroJKIt8'), {
				students: arrayUnion(student),
			});
		});
	};

	const deleteStudentFromGroup = async () => {
		// e.preventDefault()
		effectStudentToGroup.map(async student => {
			await updateDoc(doc(db, 'groups', '4sX1UN7jQ5coQlTl0lGO'), {
				students: arrayRemove(student),
			});

			await updateDoc(doc(db, 'categories', 'IkrJJbMBMvvEsroJKIt8'), {
				students: arrayRemove(student),
			});
		});
	};

	return (
		<Box width={'100%'}>
			{group && (
				<>
					<Navbar
						// category={category}
						user="admin"
						setNav={setNav}
						category={category}
						setLessonData={setLessonData}
						setGroupData={setGroupData}
					/>
					{nav == 'home' && (
						<AdminHeader
							category={category}
							group={group}
							lesson={lesson}
							setNav={setNav}
							setLessonData={setLessonData}
							lessonData={lessonData}
						/>
					)}
					{nav == 'group' && (
						<Group
							group={group}
							category={category}
							user={'admin'}
							setNav={setNav}
							setGroupData={setGroupData}
							groupData={groupData}
						/>
					)}

					{nav == 'lessons' && (
						<AdminLessonsCamp
							lesson={lesson}
							category={category}
							setNav={setNav}
							user={'admin'}
							setLessonData={setLessonData}
							lessonData={lessonData}
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
					{nav == 'student' && <Student user={'admin'} />}
					{nav == 'teacher' && <Teacher user={'admin'} />}
				</>
			)}

			{/* addCategory */}
			<form onSubmit={addCategory}>
				<input
					type="text"
					onChange={e =>
						setEffectCategory({
							...effectCategory,
							name: e.target.value,
						})
					}
					value={effectCategory.name}
					required
				/>
				<input type="submit" value="addCate" />
			</form>
			{/* add student to group */}
			<form onSubmit={addStudentToGroup}>
				<input type="text" />
				<input type="submit" value="addtogroup" />
			</form>
			{/* removestudentFromgroup */}
			<button onClick={deleteStudentFromGroup}>
				removestudentFromgroup
			</button>
			{/* update category */}
			<form onSubmit={updateCategory}>
				<input
					type="text"
					onChange={e =>
						setEffectCategory({
							...effectCategory,
							name: e.target.value,
						})
					}
					value={effectCategory.name}
					required
				/>
				<input type="submit" value="updateCate" />
			</form>
			{/* delete category */}
			<button onClick={() => deleteCategory('LV2pKsTqCwSHCvV4oquM')}>
				delete category
			</button>
		</Box>
	);
};
export default Admin;
