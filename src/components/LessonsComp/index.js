import React, { useState } from 'react';
import Link from 'next/link';
import Selectlevel from './selectLevel';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material/Box';

// Add Icon
import AddButtonLesson from '../PopUpLesson/AddButtonLesson';

// icons
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DialogBtn from '../DialogBtn';

const LessonsComp = () => {
	const [openDialog, setOpenDialog] = useState(false);
	const [lesson, setLesson] = useState([
		{
			id: '1',
			lessonName: 'vocab ',
			path: 'lesson/Cate1',
		},
		{
			id: '2',
			lessonName: 'vocab',
			path: 'lesson/Cate1',
		},
		{
			id: '3',
			lessonName: 'durem',
			path: 'lesson/Cate1',
		},
		{
			id: '4',
			lessonName: 'vocab',
			path: 'lesson/Cate1',
		},
		{
			id: '5',
			lessonName: 'durem',
			path: 'lesson/Cate1',
		},
		{
			id: '6',
			lessonName: 'vocab',
			path: 'lesson/Cate1',
		},
	]);

	return (
		<div className="container">
			<h2 className="header__big">Lessons</h2>
			<div className="controller">
				<Selectlevel id="level__selector" />
				<div className="add__button">
					<AddButtonLesson />
				</div>
			</div>
			<div className="lessons__wrapper">
				{lesson.map((d, index) => {
					return (
						<div className="lesson">
							<div className="lesson__left">
								<h3
									id="lesson__id"
									className="header__small"
								>
									{d.id}
								</h3>
								<h2
									id="lesson__name"
									className="header__small"
								>
									{d.lessonName}
								</h2>
							</div>
							<Link href={d.path}>
								<a className="lesson__btn">Үзэх</a>
							</Link>
							<DialogBtn />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default LessonsComp;
