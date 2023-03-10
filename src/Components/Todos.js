import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@material-ui/core/Paper';

import Todolist from './Todolist'


const useStyles = makeStyles({
    table: {
        minWidth: 500,
        width: "80%",
        "margin-left": "10%",
        "height": "300px"
    },
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);


export const Todos = ({page, setPage, todos, deleteitm, updateitm}) => {

    const [rowsPerPage, setRowsPerPage] = React.useState(4);

    const classes = useStyles();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - todos.length) : 0;


    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow style={{ fontstyle: "bold" }}>
                        <StyledTableCell align="center">Id</StyledTableCell>
                        <StyledTableCell align="center">Title</StyledTableCell>
                        <StyledTableCell align="center">Description</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center">Priority</StyledTableCell>
                        <StyledTableCell align="center">Date</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* showing only some(Here 7 rows from todos with the use of slice method to slice array and then map it to individual array to iterate..) */}
                    {todos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((todo) => {
                        return <Todolist todo={todo} key={todo.id} deleteitm={deleteitm} updateitm={updateitm}/>
                    })}

                    {/* Showing empty row at the end of last page to maintain the footer of table.. */}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 69 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}

                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            colSpan={3}
                            count={todos.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default Todos;

