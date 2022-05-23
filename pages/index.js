import Link from 'next/link';

import { Avatar, Container, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import nookies from 'nookies';
import { useAuth } from '../config/Auth';
import { StudentContext } from '../src/components/Context/StudentContext';
import { AdminContext } from '../src/components/Context/AdminContext';
import { TeacherContext } from '../src/components/Context/TeacherContext';
import { auth } from '../config/firebase';
import Student from '../src/components/Students';
import Teacher from '../src/components/Teacher';
import Admin from '../src/components/Admin';
export default function Home() {
	const { currentUser, user, userData } = useAuth();

	if ((user !== undefined && user.isAdmin) || userData.isAdmin) {
		return (
			<AdminContext.Provider value={{}}>

					<Admin />

			</AdminContext.Provider>
		);
	} else if ((user !== undefined && user.isTeacher) || userData.isTeacher) {
		return (
			<TeacherContext.Provider value={{}}>
				<Teacher />
			</TeacherContext.Provider>
		);
	} else {
		return (
			<StudentContext.Provider value={{}}>
				<Student />
			</StudentContext.Provider>
		);
	}
}

// export async function getServerSideProps(context) {
//   try {
//     const cookies = nookies.get(context)
//     const token = await vertifyIdToken
//   }
// }
