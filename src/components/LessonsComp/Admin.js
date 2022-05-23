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

const AdminLessonsCamp = ({
	lesson,
	category,
	setNav,
	setLessonData,
	lessonData,
}) => {
	const [openDialog, setOpenDialog] = useState(false);
	const [filterByLevel, setFilterByLevel] = useState(-1);

	return (
		<div className="container">
			{category && lessonData.cid && (
				<>
					{category.map((c, index) => {
						if (c.cid == lessonData.cid) {
							return (
								<>
									<h2 className="header__big">
										{c.name}
									</h2>
									<div className="controller">
										<Selectlevel
											id="level__selector"
											category={c}
											setFilterByLevel={
												setFilterByLevel
											}
											filterByLevel={
												filterByLevel
											}
										/>
										{/* <div className="add__button">
											<AddButtonLesson
												category={category}
											/>
										</div> */}
									</div>
									<div className="lessons__wrapper">
										{lesson &&
											lesson.lessons
												.sort(function (
													a,
													b
												) {
													return (
														a.id >
														b.id
													);
												})
												.map((l, index) => {
													console.log(
														l.level_id
													);

													if (
														l.level_id ==
															filterByLevel &&
														l.cid ==
															c.cid
													) {
														return (
															<div className="lesson">
																<div className="lesson__left">
																	<h3
																		id="lesson__id"
																		className="header__small"
																	>
																		{
																			l.id
																		}
																	</h3>
																	<h2
																		id="lesson__name"
																		className="header__small"
																	>
																		{
																			l.name
																		}
																	</h2>
																</div>

																<button
																	className="lesson__btn"
																	onClick={() => {
																		setNav(
																			'lesson'
																		);
																		setLessonData(
																			lessonData => ({
																				...lessonData,
																				lid: l.lid,
																				level_id:
																					l.level_id,
																			})
																		);
																	}}
																>
																	Үзэх
																</button>
															</div>
														);
													}
													if (
														filterByLevel ==
															-1 &&
														l.cid ==
															c.cid
													)
														return (
															<div className="lesson">
																<div className="lesson__left">
																	<h3
																		id="lesson__id"
																		className="header__small"
																	>
																		{
																			l.id
																		}
																	</h3>
																	<h2
																		id="lesson__name"
																		className="header__small"
																	>
																		{
																			l.name
																		}
																	</h2>
																</div>

																<button
																	className="lesson__btn"
																	onClick={() => {
																		setNav(
																			'lesson'
																		);
																		console.log(
																			l.lid
																		);
																		setLessonData(
																			lessonData => ({
																				...lessonData,
																				lid: l.lid,
																				gid: l.gid,
																				level_id:
																					l.level_id,
																			})
																		);
																	}}
																>
																	Үзэх
																</button>

																{/* <DialogBtn /> */}
															</div>
														);
												})}
									</div>
								</>
							);
						}
					})}
				</>
			)}
		</div>
	);
};

export default AdminLessonsCamp;
