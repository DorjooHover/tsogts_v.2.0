import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';

// table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

// Icons
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

import { visuallyHidden } from '@mui/utils';
import { styled } from '@mui/material/styles';
import {
	collection,
	doc,
	getDoc,
	onSnapshot,
	query,
	where,
} from 'firebase/firestore';
import { db } from '../../../config/firebase';

// Table style
const TableStudent = styled(Box)(({ theme }) => ({
	padding: theme.spacing(1),
	paddingLeft: theme.spacing(3),
	marginBottom: 20,
	textAlign: 'flex-start',
	alignItems: 'center',
	color: theme.palette.text.secondary,
	borderRadius: 5,
	backgroundColor: 'white',
}));

function createData(name, group, phone, email) {
	return {
		name,
		group,
		email,
		phone,
	};
}

const rows = [
	createData('Cupcake', 'eng111', 'email@email', 99666511, 67, 4.3),
	createData('Donut', 'eng111', 'asd@email', 99666511, 51, 4.9),
	createData('Eclair', 'eng111', 'emqweqail@email', 99666511, 24, 6.0),
];

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

const headCells = [
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'Нэр',
	},

	// {
	// 	id: 'group',
	// 	numeric: true,
	// 	disablePadding: false,
	// 	label: 'Group дугаар',
	// },
	{
		id: 'phone',
		numeric: true,
		disablePadding: false,
		label: 'Утасны дугаар',
	},
	{
		id: 'email',
		numeric: true,
		disablePadding: false,
		label: 'Имэйл',
	},

	// {
	// 	id: 'protein',
	// 	numeric: true,
	// 	disablePadding: false,
	// 	label: 'Protein (g)',
	// },
];

function StudentTable(props) {
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props;
	const createSortHandler = property => event => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						color="primary"
						indeterminate={
							numSelected > 0 && numSelected < rowCount
						}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							'aria-label': 'select all desserts',
						}}
					/>
				</TableCell>
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={
							headCell.disablePadding ? 'none' : 'normal'
						}
						sortDirection={
							orderBy === headCell.id ? order : false
						}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={
								orderBy === headCell.id ? order : 'asc'
							}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box
									component="span"
									sx={visuallyHidden}
								>
									{order === 'desc'
										? 'sorted descending'
										: 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

StudentTable.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = props => {
	const { numSelected } = props;

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: theme =>
						alpha(
							theme.palette.primary.main,
							theme.palette.action.activatedOpacity
						),
				}),
			}}
		>
			{numSelected > 0 ? (
				<Typography
					sx={{ flex: '1 1 100%' }}
					color="inherit"
					variant="subtitle1"
					component="div"
				>
					{numSelected} selected
				</Typography>
			) : (
				<Typography
					sx={{ flex: '1 1 100%' }}
					variant="h6"
					id="tableTitle"
					component="div"
				>
					All Teachers
				</Typography>
			)}

			{numSelected > 0 ? (
				<Tooltip title="Delete">
					<IconButton>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

const TeacherTable = ({ selected, teachers, setSelected }) => {
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('email');
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = event => {
		if (event.target.checked) {
			const newSelecteds = teachers.map(n => n.email);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, email) => {
		const selectedIndex = selected.indexOf(email);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, email);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = event => {
		setDense(event.target.checked);
	};

	const isSelected = email => selected.indexOf(email) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0
			? Math.max(0, (1 + page) * rowsPerPage - teachers.length)
			: 0;

	return (
		<>
			{teachers && (
				<Box sx={{ width: '100%' }}>
					<TableStudent sx={{ width: '100%', mb: 2 }}>
						<EnhancedTableToolbar
							numSelected={selected.length}
						/>
						<TableContainer>
							<Table
								sx={{ minWidth: 750 }}
								aria-labelledby="tableTitle"
								size={dense ? 'small' : 'medium'}
							>
								<StudentTable
									numSelected={selected.length}
									order={order}
									orderBy={orderBy}
									onSelectAllClick={
										handleSelectAllClick
									}
									onRequestSort={handleRequestSort}
									rowCount={teachers.length}
								/>
								<TableBody>
									{stableSort(
										teachers,
										getComparator(order, orderBy)
									)
										.slice(
											page * rowsPerPage,
											page * rowsPerPage +
												rowsPerPage
										)
										.map((row, index) => {
											const isItemSelected =
												isSelected(
													row.email
												);
											const labelId = `enhanced-table-checkbox-${index}`;

											return (
												<TableRow
													hover
													onClick={event =>
														handleClick(
															event,
															row.email
														)
													}
													role="checkbox"
													aria-checked={
														isItemSelected
													}
													tabIndex={-1}
													key={row.email}
													selected={
														isItemSelected
													}
												>
													<TableCell padding="checkbox">
														<Checkbox
															color="primary"
															checked={
																isItemSelected
															}
															inputProps={{
																'aria-labelledby':
																	labelId,
															}}
														/>
													</TableCell>
													<TableCell
														component="th"
														id={
															labelId
														}
														scope="row"
														padding="none"
													>
														{row.name}
													</TableCell>
													{/* <TableCell align="right">
												{row.group}
											</TableCell> */}
													<TableCell align="right">
														{
															row.phone
														}
														{!row.phone && (
															<>
																Empty
															</>
														)}
													</TableCell>
													<TableCell align="right">
														{
															row.email
														}
													</TableCell>
													{/* <TableCell align="right">
												{row.carbs}
											</TableCell>*/}
												</TableRow>
											);
										})}
									{emptyRows > 0 && (
										<TableRow
											style={{
												height:
													(dense
														? 33
														: 53) *
													emptyRows,
											}}
										>
											<TableCell colSpan={6} />
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component="div"
							count={teachers.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</TableStudent>
					{/* <FormControlLabel
				control={
					<Switch checked={dense} onChange={handleChangeDense} />
				}
				label="Dense padding"
			/> */}
				</Box>
			)}
		</>
	);
};
export default TeacherTable;
