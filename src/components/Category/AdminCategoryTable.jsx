import * as React from 'react';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CategoryLevel from './CategoryLevel';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';

// Add button
import AddButtonCategory from '../PopUpCategory/AddButtonCategory';
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
const AdminCategoryTable = ({
	category,
	user,
	group,
	setNav,
	setGroupData,
}) => {
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
					Category name
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

						<AddButtonCategory
							category={category}
							act="addCategory"
						/>

						{/* </Grid> */}
					</Box>
				</Grid>
			</Box>

			{category.map(c => {
				return (
					// <Link href={`/group/${d}`}>
					<Groups
						display="grid"
						gridTemplateColumns="repeat(12, 1fr)"
						key={c.cid}
					>
						{/* Group */}
						<Grid gridColumn="span 4">
							<h2 className="header__small">{c.name} </h2>
						</Grid>
						<Grid gridColumn="span 4">
							{/* <CategoryLevel
								category={category}
								group={g}
								gid={g.gid}
							/> */}
						</Grid>
						<Grid gridColumn="span 3">
							Total Members : {c.students.length}
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
									<AddButtonCategory
										category={c}
										act="updateCategory"
									/>
								</Grid>
								<Grid gridColumn="span 1">
									<DialogBtn
										cid={c.cid}
										act={'deleteCategory'}
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

export default AdminCategoryTable;
