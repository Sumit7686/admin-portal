import React from 'react';
import PropTypes from 'prop-types';
import classes from '../EventSchedule.module.css';
import Box from '@mui/material/Box';
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
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import { visuallyHidden } from '@mui/utils';
import copy from '../../../Assets/Images/copy.svg';
import { useNavigate } from 'react-router';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

function createData(
  name,
  day,
  time,
  active,
  id,
  subtitle,
  description,
  learnMore,
  createdAt,
  updatedAt
) {
  return {
    name,
    day,
    time,
    active,
    id,
    subtitle,
    description,
    learnMore,
    createdAt,
    updatedAt
  };
}

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

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'EVENT NAME'
  },
  {
    id: 'day',
    numeric: true,
    disablePadding: false,
    label: 'DAY'
  },
  {
    id: 'time',
    numeric: true,
    disablePadding: false,
    label: 'TIME'
  },
  {
    id: 'active',
    numeric: true,
    disablePadding: false,
    label: 'ACTIVE'
  },
  {
    id: 'active',
    numeric: true,
    disablePadding: false,
    label: ''
  }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            // color="secondary"
            style={{ color: 'black' }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{
              textTransform: 'uppercase',
              fontFamily: 'Poppins-Bold',
              fontSize: '14px',
              color: '#707070'
            }}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      style={{ position: 'absolute', top: '-12px' }}
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 }
      }}>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
          style={{ fontSize: '14px', fontFamily: 'Magdelin-Medium' }}>
          {numSelected} Entries Selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"></Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            onClick={() => props.multipleDelete(props.selected)}
            style={{
              color: '#671A21',
              backgroundColor: '#F5CFD3',
              border: '1px solid',
              borderRadius: '10px',
              marginLeft: '10px',
              fontSize: '14px',
              letterSpacing: '2px',
              fontFamily: 'Magdelin-Black'
            }}>
            <DeleteIcon style={{ color: '#671A21', width: '20px', height: '20px' }} />
            DELETE
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>{/* <FilterListIcon /> */}</IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

function EventScheduleTable(props) {
  let navigate = useNavigate();

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('day');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deleteId, setDeleteId] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const handleOpen = (id) => {
    setOpen(true);
    setDeleteId(id);
  };
  const handleClose = () => setOpen(false);

  let rows = [];

  if (props.data.status === 'error') {
    console.log('error. record not found.');
    rows.push(createData('', '', '', '', '', '', '', '', '', ''));
  } else {
    if (props.search) {
      props.data.map((item) => {
        const data = item.schedule.filter((schedule) => {
          return Object.values(schedule.event_name)
            .join('')
            .toLowerCase()
            .includes(props.search.toLowerCase());
        });
        data.map((itemValue) => {
          rows.push(
            createData(
              itemValue.event_name,
              item.day,
              itemValue.time,
              itemValue.active,
              itemValue._id,
              itemValue.subtitle,
              itemValue.description,
              itemValue.learnMore,
              props.getEventData.createdAt,
              props.getEventData.updatedAt
            )
          );
        });
      });
    } else {
      props.data.map((item) => {
        item.schedule.map((schedule) => {
          rows.push(
            createData(
              schedule.event_name,
              item.day,
              schedule.time,
              schedule.active,
              schedule._id,
              schedule.subtitle,
              schedule.description,
              schedule.learnMore,
              props.getEventData.createdAt,
              props.getEventData.updatedAt
            )
          );
        });
      });
    }
  }

  const editData = (row) => {
    navigate('/event-schedule/new-event', { state: row });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const deleteProps = () => {
    console.log('id :::', deleteId);
    props.deleteData(deleteId);
    handleClose();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div style={{ backgroundColor: 'white', border: 'none' }}>
      <Box sx={{ width: '100%' }}>
        {props.data.status !== 'error' ? (
          <div
            style={{
              width: '100%',
              marginBottom: '2px',
              background: '#fff',
              borderRadius: '10px',
              boxShadow: '3px 3px 8px rgba(0,0,0,0.1)'
            }}>
            {selected.length > 1 ? (
              <EnhancedTableToolbar
                numSelected={selected.length}
                selected={selected}
                multipleDelete={(id) => props.deleteData(id)}
              />
            ) : (
              <EnhancedTableToolbar />
            )}
            <TableContainer sx={{ padding: '3rem', marginTop: '20px' }}>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={index}
                          selected={isItemSelected}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              // color="secondary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId
                              }}
                              style={{ color: 'black' }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            className="tableCellFont">
                            {row.name}
                          </TableCell>
                          <TableCell align="center" className="tableCellFont">
                            {row.day}
                          </TableCell>
                          <TableCell align="center" className="tableCellFont">
                            {row.time}
                          </TableCell>
                          <TableCell align="center" className={classes.activeCell}>
                            <button
                              className={`${
                                row.active.toString() === 'true'
                                  ? classes.trueBtn
                                  : classes.falseBtn
                              }`}>
                              {row.active.toString()}
                            </button>
                          </TableCell>
                          <TableCell align="center">
                            <IconButton onClick={() => editData(row)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton>
                              <img src={copy} />
                            </IconButton>
                            <IconButton onClick={() => handleOpen(row.id)}>
                              <DeleteIcon />
                            </IconButton>
                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description">
                              <Box sx={style}>
                                <Typography
                                  id="modal-modal-title"
                                  style={{
                                    fontFamily: 'Magdelin-Bold',
                                    fontSize: '24px',
                                    margin: '2% 0px'
                                  }}>
                                  Confirmation
                                </Typography>
                                <Typography
                                  id="modal-modal-description"
                                  sx={{ mt: 2 }}
                                  style={{
                                    fontFamily: 'Magdelin-Regular',
                                    fontSize: '24px',
                                    margin: '10% 0px'
                                  }}>
                                  Are you sure you want to delete this?
                                </Typography>
                                <Button
                                  onClick={handleClose}
                                  style={{
                                    fontSize: '16px',
                                    borderRadius: '10px',
                                    fontFamily: 'Magdelin-Bold',
                                    padding: '0px 25px',
                                    width: '30%',
                                    height: '38px',
                                    backgroundColor: 'white',
                                    border: '1px solid black',
                                    color: 'black'
                                  }}>
                                  CANCLE
                                </Button>
                                <Button
                                  onClick={deleteProps}
                                  style={{
                                    backgroundColor: 'black',
                                    padding: '0px 25px',
                                    borderRadius: '10px',
                                    fontFamily: 'Magdelin-Bold',
                                    color: 'white',
                                    marginLeft: '10px'
                                  }}>
                                  <IconButton style={{ color: 'white', fontSize: '16px' }}>
                                    <DeleteIcon />
                                  </IconButton>
                                  <span style={{ paddingRight: '10px', fontSize: '16px' }}>
                                    CONFIRM
                                  </span>
                                </Button>
                              </Box>
                            </Modal>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows
                      }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              style={{ position: 'absolute', left: '0', right: '0', marginTop: '10px' }}
            />
          </div>
        ) : (
          <div
            style={{
              width: '100%',
              marginTop: '2%',
              p: '2%',
              textAlign: 'center',
              borderRadius: '10px',
              background: '#FFFFFF',
              height: '20rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '3px 3px 8px rgba(0,0,0,0.1)'
            }}>
            Record Not Found.
          </div>
        )}
      </Box>
    </div>
  );
}

export default EventScheduleTable;
