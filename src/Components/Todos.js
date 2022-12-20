import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Todolist from './Todolist'


const useStyles = makeStyles({
    table: {
        minWidth: 500,
        width: "80%",
        "margin-left": "10%"
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


export const Todos = (props) => {

    const classes = useStyles();

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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.todos.map((todo) => {
                            return <Todolist todo={todo} key={todo.id} />
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
    )
}

export default Todos;

