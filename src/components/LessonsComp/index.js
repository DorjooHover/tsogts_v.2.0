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

const LessonsComp = ({ lesson, category, setNav, setLessonData }) => {
	const [openDialog, setOpenDialog] = useState(false);
	const [filterByLevel, setFilterByLevel] = useState(-1);

	return (
		<div className="container">
			<h2 className="header__big">Lessons</h2>
			<div className="controller">
				<Selectlevel
					id="level__selector"
					category={category[0]}
					setFilterByLevel={setFilterByLevel}
					filterByLevel={filterByLevel}
				/>
				<div className="add__button">
					<AddButtonLesson category={category} />
				</div>
			</div>
			<div className="lessons__wrapper">
				{lesson.lessons.sort(function(a, b) {return a.id > b.id}).map((l, index) => {
					if (l.level_id == filterByLevel)
						return (
							<div className="lesson">
								<div className="lesson__left">
									<h3
										id="lesson__id"
										className="header__small"
									>
										{l.id}
									</h3>
									<h2
										id="lesson__name"
										className="header__small"
									>
										{l.name}
									</h2>
								</div>

								<button
									className="lesson__btn"
									onClick={() => {
										setNav('lesson');
										setLessonData(lessonData => ({
											...lessonData,
											lid: l.lid,
											gid: l.gid,
											level_id: l.level_id,
											cid: category[0].cid,
										}));
									}}
								>
									Үзэх
								</button>

								<DialogBtn
									act={'deleteLesson'}
									lid={l.lid}
									cid={category[0].cid}
								/>
							</div>
						);
					if (filterByLevel == -1)
						return (
							<div className="lesson">
								<div className="lesson__left">
									<h3
										id="lesson__id"
										className="header__small"
									>
										{l.id}
									</h3>
									<h2
										id="lesson__name"
										className="header__small"
									>
										{l.name}
									</h2>
								</div>

								<button
									className="lesson__btn"
									onClick={() => {
										setNav('lesson');
										setLessonData(lessonData => ({
											...lessonData,
											lid: l.lid,
											gid: l.gid,
											level_id: l.level_id,
											cid: category[0].cid,
										}));
									}}
								>
									Үзэх
								</button>

								<DialogBtn
									act={'deleteLesson'}
									lid={l.lid}
									cid={category[0].cid}
								/>
							</div>
						);
				})}
			</div>
		</div>
	);
};

export default LessonsComp;
