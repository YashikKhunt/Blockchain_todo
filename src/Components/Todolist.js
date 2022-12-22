import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@mui/material';
import Modal from '@material-ui/core/Modal';
import { useState } from 'react';
import Editlist from './Editlist';
import Fade from '@material-ui/core/Fade';
import '../Styles/popup.css';


function Todolist({ todo, deleteitm, updateitm }) {

  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);


  const del = (id) => {
    deleteitm(id);
  }

  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row" align="center">
          {todo.id}
        </TableCell>
        <TableCell align="center">{todo.title}</TableCell>
        <TableCell align="center">{todo.desc}</TableCell>
        <TableCell align="center">{todo.status}</TableCell>
        <TableCell align="center">{todo.priority}</TableCell>
        <TableCell align="center">{todo.date}</TableCell>
        <TableCell align="center">
          <div>
            <Button onClick={() => del(todo.id)} color='error'>
              <DeleteIcon />
            </Button>
            <Button onClick={() => handleOpen(todo.id)} >
              <EditIcon />
            </Button>
          </div>
        </TableCell>
      </TableRow>

      {/* Modal material ui for displying pop-up. */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Fade in={open}>
          <div className='popup'>
            <Editlist id={id} updateitm={updateitm} close={handleClose}/>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

export default Todolist