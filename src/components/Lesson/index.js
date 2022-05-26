import React, { useEffect, useState } from 'react';
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
import {
	collection,
	doc,
	getDoc,
	onSnapshot,
	query,
	where,
} from 'firebase/firestore';
import { db } from '../../../config/firebase';

import Player from 'griffith';

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

const sources = {
	hd: {
		play_url:
			'https://firebasestorage.googleapis.com/v0/b/tsogts-c2011.appspot.com/o/files%2FMoments-clip-from-Nov-02%2C-2021.mp4?alt=media&token=75d00ecf-ac02-4328-b703-90e6b1deb20b',
	},
};

const Lesson = ({ lessonData, lesson, setLessonData, group }) => {
	// tab
	const [value, setValue] = React.useState(0);
	const [videoUrl, setVideoUrl] = useState();
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	useEffect(() => {
		return () => fetchLesson();
	}, []);
	const fetchLesson = async () => {
		console.log(lessonData.cid, lessonData.level_id);
		if (lessonData.cid != '' && lessonData.level_id != undefined) {
			const videoDoc = collection(
				db,
				'categories/' + lessonData.cid + '/lessons'
			);
			const videoQuery = query(
				videoDoc,
				where('level_id', '<=', parseInt(lessonData.level_id))
			);
			const videoSnap = onSnapshot(videoQuery, queryVideo => {
				setVideoUrl(
					queryVideo.docs.map(v => ({
						...v.data(),
						lid: v.id,
					}))
				);
			});
		}
	};

	return (
		<>
			{lesson && videoUrl && (
				<section className="lesson__section">
					<Box sx={{ flexGrow: 1 }}>
						<Grid
							container
							spacing={5}
							// columns={{ xs: 4, sm: 8, md: 12 }}
						>
							<Grid item xs={8}>
								{videoUrl &&
									lessonData.lid == '' &&
									videoUrl
										.slice(0, 1)
										.map((v, index) => {
											return (
												<Player
													sources={{
														hd: {
															play_url:
																v.video,
														},
													}}
													key={v.lid}
												/>
											);
										})}
								{videoUrl &&
									lessonData.lid != '' &&
									videoUrl.map((v, index) => {
										if (v.lid == lessonData.lid) {
											return (
												<Player
													sources={{
														hd: {
															play_url:
																v.video,
														},
													}}
													key={v.lid}
												/>
											);
										}
									})}
							</Grid>
							<Grid item xs={4}>
								{videoUrl
									.sort(function (a, b) {
										return a.id > b.id;
									})
									.map((d, index) => {
										return (
											<div
												className="side__lesson"
												key={d.lid}
											>
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
														{d.name}
													</h2>
												</div>

												{/* <Link href={d.path}> */}
												<button
													className="lesson__btn"
													onClick={() => {
														console.log(
															d.lid
														);
														setLessonData(
															lessonData => ({
																...lessonData,
																lid: d.lid,
															})
														);
													}}
												>
													Үзэх
												</button>
												{/* </Link> */}
											</div>
										);
									})}
							</Grid>
						</Grid>
					</Box>
				</section>
			)}
		</>
	);
};

export default Lesson;
