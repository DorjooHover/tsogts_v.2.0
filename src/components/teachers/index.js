import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddButtonStyled from '../PopUpAdd/AddButtonStyled';
import TeacherTable from './TeacherTable';
import { collection, where, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import DeleteButtonStyled from '../PopUpAdd/DeleteButtonStyled';

// import MUIDataTable from 'mui-datatables';

// const columns = ['Name', 'Company', 'City', 'State'];

// const data = [
// 	['Joe James', 'Test Corp', 'Yonkers', 'NY'],
// 	['John Walsh', 'Test Corp', 'Hartford', 'CT'],
// 	['Bob Herm', 'Test Corp', 'Tampa', 'FL'],
// 	['James Houston', 'Test Corp', 'Dallas', 'TX'],
// ];

// const options = {
// 	filterType: 'checkbox',
// };

const Teacher = ({ user }) => {
	const [selected, setSelected] = useState([]);
	const [teachers, setTeachers] = React.useState();
	useEffect(() => {
		const fetchData = () => {
			const studentDoc = collection(db, 'users');
			const studentQuery = query(
				studentDoc,
				where('isTeacher', '==', true),
				where('isAdmin', '==', false)
			);
			onSnapshot(studentQuery, queryStudent => {
				setTeachers(
					queryStudent.docs.map(s => ({
						...s.data(),
						sid: s.id,
					}))
				);
			});
		};

		return () => {
			fetchData();
		};
	}, []);
	console.log(selected);
	return (
		<div className="container">
			<h1 className="header__big"></h1>
			<div className="main__section">
				<div className="group__content">
					<div className="add__button">
						<DeleteButtonStyled
							act={'removeTeacher'}
							teachers={teachers}
							selected={selected}
							setSelected={setSelected}
							user={user}
						/>
					</div>
					<TeacherTable
						selected={selected}
						setSelected={setSelected}
						teachers={teachers}
					/>
				</div>
			</div>
		</div>
	);
};

export default Teacher;
