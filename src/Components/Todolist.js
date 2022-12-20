import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
// import '../Styles/Header.css';

function Todolist({ todo }) {

  return (
    <TableRow key={todo.id}>
      <TableCell component="th" scope="row" align="center">
        {todo.id}
      </TableCell>
      <TableCell align="center">{todo.title}</TableCell>
      <TableCell align="center">{todo.desc}</TableCell>
      <TableCell align="center">{todo.status}</TableCell>
      <TableCell align="center">{todo.priority}</TableCell>
    </TableRow>
  )
}

export default Todolist