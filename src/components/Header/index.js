import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import Loader from '../Loader';

// Icons
import ArticleIcon from '@mui/icons-material/Article';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const Card = styled(Box)`
	background-color: white;
	padding: 20px;
	border-radius: 20px;
	transition: 0.3s ease;
	cursor: pointer;
	.article__icon {
		width: 50px;
		height: 50px;
		padding: 10px;
		border-radius: 50%;
		background: linear-gradient(
			90deg,
			rgba(255, 199, 0, 1) 0%,
			rgba(255, 139, 0, 1) 35%,
			rgba(255, 57, 0, 1) 100%
		);

		color: white;
	}
	.header__small {
		margin: 10px 0;
	}
	.teacher {
		display: flex;
		align-items: center;
		margin-bottom: 15px;
		.avatar {
			margin-right: 10px;
		}
	}

	.text__small {
		display: flex;
		align-items: center;
		font-weight: 700;
		color: #bdbdbd;
		.course__icon {
			color: inherit;
			transition: 0.3s ease;
			margin-right: 10px;
		}
	}
	&:hover {
		background-color: #e8e8e8;
		.text__small {
		}
	}
`;

const Header = ({ courseData, group, category, lessons, lessonData }) => {
	// const [data, setData] = useState(['asdf', 'asd']);
	console.log(category, lessonData);
	return (
		<>
			{/* <div className="wrapper"> */}

			{catergory && lesson && (
				<div className="container">
					<h1 className="header__big">{category[0].name}</h1>
					<div id="home__course">
						{group &&
							group.map((d, index) => {
								return (
									<Card
										key={g.gid}
										onClick={() => {
											setNav('lesson');
											setLessonData(
												lessonData => ({
													...lessonData,
													level_id:
														g.level_id,
													cid: g.categoryId,
												})
											);
										}}
									>
										<ArticleIcon className="article__icon" />
										<h2 className="header__small">
											{g.name + g.id}
										</h2>

										<p className="text__small">
											<LibraryBooksIcon
												fontSize="small"
												className="course__icon"
											/>
											{lesson.lessons.map(
												ln => {
													if (
														g.level_id >=
														ln.level_id
													)
														countLesson++;
												}
											)}
											{countLesson}
										</p>
									</Card>
								);
							})}
						{/* {JSON.stringify(data)} */}
					</div>
				</div>
			)}
			{/* </div> */}
		</>
	);
};

export default Header;
