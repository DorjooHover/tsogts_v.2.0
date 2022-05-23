import React from 'react';
import Student from '../src/components/Student';

const StudentPage = ({ groupData }) => {
	return (
		<>
			<Student groupData={groupData} />
		</>
	);
};

export default StudentPage;
