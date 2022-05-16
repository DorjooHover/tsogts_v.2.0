import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { styled } from '@mui/material/styles';
import { grid } from '@mui/system';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

// Video below tabs
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}
const toggleTab = index => {
	setToggleState(index);
};

const Lesson = () => {
	// tab
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	// Side Lesson Data
	const [lesson, setLesson] = useState([
		{
			id: '1',
			lessonName: 'durem ',
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
		<section className="lesson__section">
			<Box sx={{ flexGrow: 1 }}>
				<Grid
					container
					spacing={5}
					// columns={{ xs: 4, sm: 8, md: 12 }}
				>
					<Grid item xs={8}>
						<ReactPlayer
							controls
							url="https://www.youtube.com/watch?v=5qap5aO4i9A"
							className="video__player"
						/>
						<Box sx={{ width: '100%' }}>
							<Box
								sx={{
									borderBottom: 1,
									borderColor: 'divider',
								}}
							>
								<Tabs
									value={value}
									onChange={handleChange}
									aria-label="basic tabs example"
								>
									<Tab
										label="Тайлбар"
										{...a11yProps(0)}
									/>

									<Tab
										label="Сэтгэгдэл"
										{...a11yProps(1)}
									/>
								</Tabs>
							</Box>
							<TabPanel value={value} index={0}>
								Item One
							</TabPanel>

							<TabPanel value={value} index={1}>
								<textarea
									name=""
									id=""
									cols="30"
									rows="10"
								></textarea>
							</TabPanel>
						</Box>
					</Grid>
					<Grid item xs={4}>
						{lesson.map((d, index) => {
							return (
								<div className="side__lesson">
									<div className="lesson__left">
										<h3
											id="lesson__id"
											className="text__medium"
										>
											{d.id}
										</h3>
										<h2
											id="lesson__name"
											className="text__medium"
										>
											{d.lessonName}
										</h2>
									</div>

									<Link href={d.path}>
										<a className="lesson__btn">
											Үзэх
										</a>
									</Link>
								</div>
							);
						})}
					</Grid>
				</Grid>
			</Box>
		</section>
	);
};

export default Lesson;
