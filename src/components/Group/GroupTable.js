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
const groupTable = () => {
	const [data, setData] = useState(['a1', 'a2', 'a3']);
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
					// display="grid"
					// gridTemplateColumns="repeat(2,1fr)"
					// alignItems="center"
					>
						{/*<Grid gridColumn="span 1"></Grid>
						<Grid gridColumn="span 1"> */}
						<AddButtonGroup />
						{/* </Grid> */}
					</Box>
				</Grid>
			</Box>
			{data.map(d => {
				return (
					// <Link href={`/group/${d}`}>
					<Groups
						display="grid"
						gridTemplateColumns="repeat(12, 1fr)"
					>
						{/* Group */}
						<Grid gridColumn="span 4">
							<h2 className="header__small">{d} </h2>
						</Grid>
						<Grid gridColumn="span 4">
							<Level />
						</Grid>
						<Grid gridColumn="span 3">
							Total Members : 16
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
									<Link href={`/group/${d}`}>
										<a className="lesson__btn">
											Харах
										</a>
									</Link>
								</Grid>
								<Grid gridColumn="span 1">
									<DialogBtn />
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
