import React from 'react';
import Group from '../../src/components/Group';

const Groups = ({ category, user, group }) => {
	return (
		<>
			<Group category={category} user={user} group={group}/>
		</>
	);
};

export default Groups;
