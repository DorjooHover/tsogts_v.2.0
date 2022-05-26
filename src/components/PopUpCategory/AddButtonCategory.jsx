import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import PopUpAdd from '.';
import { ContactPageSharp, Edit } from '@mui/icons-material';

const AddButtonCategory = ({ category, act }) => {
	const [openPopUpGroup, setOpenPopUpGroup] = useState(false);
	const [level, setLevel] = React.useState({
		l_0: '',
		l_1: '',
		l_2: '',
		l_3: '',
		l_4: '',
		l_5: '',
		l_6: '',
		l_7: '',
		l_8: '',
		l_9: '',
	});
	const [categoryData, setCategoryData] = useState({ name: '', id: null });
	const [selected, setSelected] = useState([]);
	const [teacher, setTeacher] = useState();
	const handleEdit = () => {
		category.levels.map((l, index) => {
			switch (index) {
				case 0:
					setLevel(level => ({ ...level, l_0: l.level }));
					break;
				case 1:
					setLevel(level => ({ ...level, l_1: l.level }));
					break;
				case 2:
					setLevel(level => ({ ...level, l_2: l.level }));
					break;
				case 3:
					setLevel(level => ({ ...level, l_3: l.level }));
					break;
				case 4:
					setLevel(level => ({ ...level, l_4: l.level }));
					break;
				case 5:
					setLevel(level => ({ ...level, l_5: l.level }));
					break;
				case 6:
					setLevel(level => ({ ...level, l_6: l.level }));
					break;
				case 7:
					setLevel(level => ({ ...level, l_7: l.level }));
					break;
				case 8:
					setLevel(level => ({ ...level, l_8: l.level }));
					break;
				case 9:
					setLevel(level => ({ ...level, l_9: l.level }));
					break;
				default:
					break;
			}
		});
		setCategoryData(cateData => ({ ...cateData, name: category.name }));
		setOpenPopUpGroup(true);
	};

	return (
		<>
			{act == 'addCategory' && (
				<IconButton
					aria-label="add"
					sx={{
						marginLeft: 2,
						borderRadius: 3,
						display: 'flex',
						flexDirection: 'row',
					}}
					onClick={() => setOpenPopUpGroup(true)}
				>
					<AddIcon />
					<p className="text__big">Нэмэх</p>
				</IconButton>
			)}
			{act == 'updateCategory' && (
				<IconButton
					aria-label="add"
					sx={{
						marginLeft: 2,
						borderRadius: 3,
						display: 'flex',
						flexDirection: 'row',
					}}
					onClick={() => handleEdit()}
				>
					<Edit />
					<p className="text__big">Edit</p>
				</IconButton>
			)}
			{openPopUpGroup && (
				<PopUpAdd
					closePopUp={setOpenPopUpGroup}
					category={category}
					act={act}
					selected={selected}
					setSelected={setSelected}
					teacher={teacher}
					setTeacher={setTeacher}
					categoryData={categoryData}
					setCategoryData={setCategoryData}
					level={level}
					setLevel={setLevel}
				/>
			)}
		</>
	);
};

export default AddButtonCategory;
