import React, { useState } from 'react';
import tsogtsLogo from '../../../public/images/tsogts.jpg';
import Link from 'next/dist/client/link';
// TODO: IMAGES
import Image from 'next/image';
import { BsFillPeopleFill } from 'react-icons/bs';
import { BsFillPersonFill } from 'react-icons/bs';
import { GiTeacher } from 'react-icons/gi';
import { BiBookOpen } from 'react-icons/bi';
import { MdAdminPanelSettings } from 'react-icons/md';
import { Container, Button } from '../styled/Container.styled';

import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth } from '../../../config/firebase';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useAuth } from '../../../config/Auth';
import { ArrowDropDown } from '@mui/icons-material';
// const menuItems = [
// 	{ name: 'Group', to: '/group' },
// 	{
// 		name: 'Student',
// 		to: '/student',
// 	},
// 	{
// 		name: 'Lesson',
// 		to: '/lesson',
// 		submenus: [{ name: 'English' }, { name: 'Chinese' }],
// 	},
// 	{
// 		name: 'Admin',
// 		to: '/admin',
// 	},
// ];
const Navbar = ({ category, user, setNav, setLessonData, setGroupData }) => {
	const [isSidebar, setSidebar] = useState(false);

	const sideBar = () => {
		setSidebar(!isSidebar);
	};
	const [dropDownLesson, setDropDownLesson] = useState(false);
	const [dropDownGroup, setDropDownGroup] = useState(false);

	// SubMenu
	const [data, setData] = useState(['Cate1', 'Cate2', 'Cate3']);
	return (
		<div id="dashboard" className={isSidebar ? 'sidebar' : ''}>
			<button className="extend__btn" onClick={sideBar}>
				<CompareArrowsIcon
					// fontSize="medium"
					className="extend__icon"
				/>
			</button>
			<div className="navbar__container">
				<div className="nav__logo">
					<img src="/images/tsogts.jpg" alt="" />
					{/* <p className="text__small">Tsogts surgalt</p> */}
				</div>
				<div className="nav__list">
					{user == 'teacher' && (
						<ul>
							<li
								className="nav__item"
								onClick={() => setNav('home')}
							>
								<BsFillPeopleFill className="navIcon" />
								<p className="text__big">Home</p>
							</li>
							<li
								className="nav__item"
								onClick={() => setNav('group')}
							>
								<BsFillPeopleFill className="navIcon" />
								<p className="text__big">Group</p>
							</li>
							<li
								className="nav__item"
								onClick={() => setNav('lessons')}
							>
								<>
									<BiBookOpen className="navIcon" />
									<p className="text__big">Lesson</p>
								</>

								{/* <ul>
								{data.map(d => {
									return (
										<li>
											<Link
												href={`/lesson/${d}`}
											>
												<a>
													<BiBookOpen className="navIcon" />
													{d}
												</a>
											</Link>
										</li>
									);
								})}
							</ul> */}
							</li>
						</ul>
					)}
					{user == 'student' && (
						<ul>
							<li
								className="nav__item"
								onClick={() => setNav('home')}
							>
								<BsFillPeopleFill className="navIcon" />
								<p className="text__big">Home</p>
							</li>
						</ul>
					)}
					{user == 'admin' && (
						<ul>
							<li
								className="nav__item"
								onClick={() => setNav('home')}
							>
								<BsFillPeopleFill className="navIcon" />
								<p className="text__big">Home</p>
							</li>
							<li
								className="nav__item"
								onClick={() => setNav('category')}
							>
								<BsFillPeopleFill className="navIcon" />
								<p className="text__big">Category</p>
							</li>
							<li
								className="nav__item"
								onClick={() =>
									setDropDownGroup(!dropDownGroup)
								}
							>
								<BsFillPeopleFill className="navIcon" />
								<p className="text__big">Group</p>
								{dropDownGroup && (
									<ArrowDropDown
										className="navIcon"
										sx={{
											transform:
												'rotate(180deg)',
											transition:
												'all 0.3s ease',
										}}
									/>
								)}
								{!dropDownGroup && (
									<ArrowDropDown
										className="navIcon"
										sx={{
											transform:
												'rotate(0deg)',
											transition:
												'all 0.3s  ease',
										}}
									/>
								)}
							</li>
							{dropDownGroup && (
								<ul className="nav__groups">
									{category.map(c => {
										return (
											<li
												onClick={() => {
													setNav(
														'group'
													);
													setGroupData(
														groupData => ({
															...groupData,
															cid: c.cid,
														})
													);
												}}
												key={c.cid}
											>
												<BiBookOpen
													className="navIcon"
													fontSize="small"
												/>
												{c.name}
											</li>
										);
									})}
								</ul>
							)}
							<li
								className="nav__item "
								onClick={() =>
									setDropDownLesson(!dropDownLesson)
								}
							>
								<>
									<BiBookOpen className="navIcon" />
									<p className="text__big">Lesson</p>
									{dropDownLesson && (
										<ArrowDropDown
											className="navIcon"
											sx={{
												transform:
													'rotate(180deg)',
												transition:
													'all 0.3s ease',
											}}
										/>
									)}
									{!dropDownLesson && (
										<ArrowDropDown
											className="navIcon"
											sx={{
												transform:
													'rotate(0deg)',
												transition:
													'all 0.3s  ease',
											}}
										/>
									)}
								</>
							</li>
							{dropDownLesson && (
								<ul className="nav__groups">
									{category.map(c => {
										return (
											<li
												onClick={() => {
													setNav(
														'lessons'
													);
													setLessonData(
														lessonData => ({
															...lessonData,
															cid: c.cid,
														})
													);
												}}
												key={c.cid}
											>
												<BiBookOpen
													className="navIcon"
													fontSize="small"
												/>
												{c.name}
											</li>
										);
									})}
								</ul>
							)}
							<li
								className="nav__item"
								onClick={() => setNav('student')}
							>
								<BsFillPersonFill className="navIcon" />
								<p className="text__big">Student</p>
							</li>
							<li
								className="nav__item"
								onClick={() => setNav('teacher')}
							>
								<GiTeacher className="navIcon" />
								<p className="text__big">Teacher</p>
							</li>
						</ul>
					)}
				</div>
			</div>

			<button className="signout" onClick={() => auth.signOut()}>
				<LogoutIcon
					// fontSize="medium"
					className="navIcon"
				/>
				Гарах
			</button>
		</div>
	);
};

export default Navbar;
