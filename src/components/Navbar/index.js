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

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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

const Navbar = () => {
	const [isSidebar, setSidebar] = useState(false);

	const sideBar = () => {
		setSidebar(!isSidebar);
	};

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
					<img src="/public/images/tsogts.jpg" alt="" />
					{/* <p className="text__small">Tsogts surgalt</p> */}
				</div>
				<div className="nav__list">
					<ul>
						{/* {menuItems.map((menuItems, index) => (
							<MenuItem key={index} />
						))} */}
						{/* <li>
							<Link href="/" className="link">
								<a className="link">Hicheel</a>
							</Link>
						</li> */}
						<li>
							<Link href="/">
								<a className="nav__item">
									<BsFillPeopleFill className="navIcon" />
									<p className="text__big">Home</p>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/group">
								<a className="nav__item">
									<BsFillPeopleFill className="navIcon" />
									<p className="text__big">Group</p>
								</a>
							</Link>
						</li>
						<li
						// className={
						// 	isActive
						// 		? 'reveal__nested'
						// 		: 'nested__nav'
						// }
						// onClick={toggleClass}
						>
							<Link href="/lessons">
								<a className="nav__item">
									<BiBookOpen className="navIcon" />
									<p className="text__big">Lesson</p>
								</a>
							</Link>
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
						<li>
							<Link href="/student">
								<a className="nav__item">
									<BsFillPersonFill className="navIcon" />
									<p className="text__big">
										Student
									</p>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/teacher">
								<a className="nav__item">
									<GiTeacher className="navIcon" />
									<p className="text__big">
										Teacher
									</p>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/admin">
								<a className="nav__item">
									<MdAdminPanelSettings className="navIcon" />
									<p className="text__big">Admin</p>
								</a>
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<Link href="/sign">
				<a className="signout">
					<LogoutIcon
						// fontSize="medium"
						className="navIcon"
					/>
					Гарах
				</a>
			</Link>
		</div>
	);
};

export default Navbar;
