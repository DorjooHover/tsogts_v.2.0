import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddButtonStyled from '../PopUpAdd/AddButtonStyled';
import StudentTable from './StudentTable';
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

const Student = ({ user }) => {
	const [selected, setSelected] = useState([]);
	const [deleteStudents, setDeleteStudents] = useState(false);
	const [closePopUp, setClosePopup] = useState(false);
	const [students, setStudents] = React.useState();
	useEffect(() => {
		const fetchData = () => {
			const studentDoc = collection(db, 'users');
			const studentQuery = query(
				studentDoc,
				where('isTeacher', '==', false),
				where('isAdmin', '==', false)
			);
			onSnapshot(studentQuery, queryStudent => {
				setStudents(
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
	return (
		<div className="container">
			<h1 className="header__big"></h1>
			<div className="main__section">
				<div className="group__content">
					<div className="add__button">
						<DeleteButtonStyled
							user={user}
							selected={selected}
							setSelected={setSelected}
							act={'removeStudent'}
							students={students}
						/>
						<AddButtonStyled
							students={students}
							user={user}
							selected={selected}
							setSelected={setSelected}
						/>
					</div>
					<StudentTable
						user={user}
						selected={selected}
						setSelected={setSelected}
						students={students}
					/>
				</div>
			</div>
		</div>
	);
};

export default Student;
