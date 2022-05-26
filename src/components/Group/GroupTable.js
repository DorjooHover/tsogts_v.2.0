import * as React from 'react';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Level from './Level';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';

// Add button
import AddButtonGroup from '../PopUpGroup/AddButtonGroup';
// Delete icon
import { MdDelete } from 'react-icons/md';
import DialogBtn from '../DialogBtn';

const Groups = styled(Box)(({ theme }) => ({
	padding: theme.spacing(1),
	paddingLeft: theme.spacing(3),
	marginBottom: 20,
	textAlign: 'flex-start',
	alignItems: 'center',
	color: theme.palette.text.secondary,
	borderRadius: 5,
	backgroundColor: 'white',
}));
const groupTable = ({ category, user, group, setNav, setGroupData }) => {
	return (
		<Box sx={{ width: 1 }}>
			<Box
				display="grid"
				gridTemplateColumns="repeat(12, 1fr)"
				mb={2}
				alignItems="center"
			>
				{/* Group */}
				<Grid gridColumn="span 4" fontWeight={700}>
					Group name
				</Grid>
				<Grid gridColumn="span 4" fontWeight={700}>
					Course level
				</Grid>
				<Grid gridColumn="span 3" fontWeight={700}>
					Members
				</Grid>
				<Grid gridColumn="span 1">
					<Box
						display="flex"
						// gridTemplateColumns="repeat(2,1fr)"
						justifyContent={'end'}
					>
						{/*<Grid gridColumn="span 1"></Grid>
						<Grid gridColumn="span 1"> */}
						{user == 'teacher' && (
							<AddButtonGroup category={category} />
						)}
						{/* </Grid> */}
					</Box>
				</Grid>
			</Box>

			{group.map(g => {
				if (g.categoryId == category.cid)
					return (
						// <Link href={`/group/${d}`}>
						<Groups
							display="grid"
							gridTemplateColumns="repeat(12, 1fr)"
						>
							{/* Group */}
							<Grid gridColumn="span 4">
								<h2 className="header__small">
									{g.name + ' ' + g.id}{' '}
								</h2>
							</Grid>
							<Grid gridColumn="span 4">
								<Level
									category={category}
									group={g}
									gid={g.gid}
								/>
							</Grid>
							<Grid gridColumn="span 3">
								Total Members : {g.students.length}
								{/* Utgaa avna */}
							</Grid>
							<Grid gridColumn="span 1">
								<Box
									display="grid"
									gridTemplateColumns="repeat(5,1fr)"
									textAlign="right"
									alignItems="center"
								>
									<Grid gridColumn="span 1">
										<button
											className="lesson__btn"
											onClick={() => {
												setNav('students');
												setGroupData(
													groupData => ({
														...groupData,
														gid: g.gid,
														cid: g.categoryId,
														level_id:
															g.level_id,
													})
												);
											}}
										>
											Харах
										</button>
									</Grid>
									<Grid gridColumn="span 1">
										<DialogBtn
											gid={g.gid}
											act={'deleteGroup'}
										/>
									</Grid>
								</Box>
							</Grid>
						</Groups>
						// </Link>
					);
			})}
		</Box>
	);
};

export default groupTable;
