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

const Header = ({ courseData }) => {
	// const [data, setData] = useState(['asdf', 'asd']);
	const [data, setData] = useState([
		{
			courseName: 'English',
			teacherName: 'Jhon',
			image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fprofile&psig=AOvVaw0ykPLuD6WTMWiF8gYYLdfj&ust=1652564492158000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKid4s643fcCFQAAAAAdAAAAABAD',
			totalVideo: '16',
			path: '/lesson/cate1',
		},
		{
			courseName: 'English',
			teacherName: 'Jhon',
			image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fprofile&psig=AOvVaw0ykPLuD6WTMWiF8gYYLdfj&ust=1652564492158000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKid4s643fcCFQAAAAAdAAAAABAD',
			totalVideo: '15',
			path: '/lesson/cate1',
		},
		{
			courseName: 'English',
			teacherName: 'Jhon',
			image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fprofile&psig=AOvVaw0ykPLuD6WTMWiF8gYYLdfj&ust=1652564492158000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKid4s643fcCFQAAAAAdAAAAABAD',
			totalVideo: '14',
			path: '/lesson/cate1',
		},
		{
			courseName: 'English',
			teacherName: 'Jhon',
			image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fprofile&psig=AOvVaw0ykPLuD6WTMWiF8gYYLdfj&ust=1652564492158000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKid4s643fcCFQAAAAAdAAAAABAD',
			totalVideo: '13',
			path: '/lesson/cate1',
		},
	]);
	return (
		<>
			{/* <div className="wrapper"> */}

			<div className="container">
				<h1 className="header__big">Home</h1>
				<div id="home__course">
					{data.map((d, index) => {
						return (
							<Link href={`${d.path}`}>
								<Card>
									<ArticleIcon className="article__icon" />
									<h2 className="header__small">
										{d.courseName}
									</h2>
									<div className="teacher">
										<Avatar
											className="avatar"
											alt="Remy Sharp"
											sx={{
												width: 30,
												height: 30,
											}}
											src="https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fprofile&psig=AOvVaw0ykPLuD6WTMWiF8gYYLdfj&ust=1652564492158000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKid4s643fcCFQAAAAAdAAAAABAD"
										/>
										<div className="text__small">
											{d.teacherName}
										</div>
									</div>
									<p className="text__small">
										<LibraryBooksIcon
											fontSize="small"
											className="course__icon"
										/>
										${d.totalVideo} videos
									</p>
								</Card>
							</Link>
						);
					})}
					{/* {JSON.stringify(data)} */}
				</div>
			</div>
			{/* </div> */}
		</>
	);
};

export default Header;
