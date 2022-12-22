import { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Todos from './Components/Todos';
import { todoContract, web3 } from './getweb3.js';
import { Box, Button, Fade, Modal } from '@mui/material';
import Editlist from './Components/Editlist';



function App() {

  //state hooks
  const [curruser, setUser] = useState('');
  const [todos, settodos] = useState([]);
  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(0);
  let count;


  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getuserdetial().then((acc) => {
      setUser(acc[0]);
    });
    //loadtodo();
  },[]);


  //Getting user account..
  const getuserdetial = async () => {
    const account = await web3.eth.getAccounts();
    return account;
  }

  const gettasklength = async () => {
    count = await todoContract.methods.getTaskCount(curruser).call();
    return count;
  }


  //Adding The task to Blockchain
  const addtodo = async (title, desc, priority, status, value) => {
    await todoContract.methods.addTask(title.toString(), desc.toString(), priority.toString(), status, value).send({
      from: curruser,
    }).then(() => {
      alert("The Task has succesfully added..");
      loadtodo();
    });
  };

  //lode all todo funtion
  const loadtodo = async () => {
    const _todos = [];
    const length = await gettasklength();
    let i;
    const start = length - 1 - (page) * 10;
    const end = Math.max(start - 10, 0);
    for (i = start; i >= end; i--) {
      let tasksdet = await todoContract.methods.getTask(i, curruser).call();
      let myTodo = {
        id: parseInt(tasksdet.id),
        title: tasksdet.title,
        status: (tasksdet.status) ? "Completed" : "Not Completed",
        desc: tasksdet.desc,
        priority: tasksdet.priority,
        date: tasksdet.date
      }
      _todos.push(myTodo);
    }
    settodos(_todos);
  };

  //delete todo specific..
  const deletetodo = async (id) => {
    await todoContract.methods.deleteTask(id).send({
      from: curruser
    });
    loadtodo();
  }

  //updating Todo item..
  const updateitm = async (id, title, desc, priority, status, dateto) => {
    await todoContract.methods.updateTask(id, title, desc, priority, status, dateto).send({
      from: curruser
    })
  }


  return (
    <div className="App">
      <Header user={curruser} />
      <Box sx={{ display: 'flex', mt: 2, justifyContent: 'center', gap: 2, mb: 2 }}>
        <Button variant="contained" id="submit" type='submit' color='secondary' onClick={() => { handleOpen() }}> Add Todo</Button>
        <Button variant="contained" id="submit" type='submit' color='success' margin={2} onClick={() => { loadtodo() }}> Refresh</Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Fade in={open}>
          <div className='popup'>
            <Editlist id={null} close={handleClose} addtodo={addtodo} loadtodo={loadtodo} todo={null} />
          </div>
        </Fade>
      </Modal>
      <Todos todos={todos} deleteitm={deletetodo} updateitm={updateitm} page={page} setPage={setPage} />
    </div>
  );
}

export default App;
