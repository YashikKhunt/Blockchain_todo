import { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import AddTodo from './Components/AddTodo';
import Todos from './Components/Todos';
import { todoContract, web3 } from './getweb3.js';



function App() {

  //state hooks
  const [curruser, setUser] = useState('');
  const [todos, settodos] = useState([]);
  let count;

  useEffect(() => {
    getuserdetial().then((acc) => {
      setUser(acc[0]);
    });
    loadtodo();
  }, []);
 

  //Getting user account..
  const getuserdetial = async () => {
    const account = await web3.eth.getAccounts();
    return account;
  }
  
  const gettasklength = async () => {
    count = await todoContract.methods.getTaskCount().call();
    return count;
  }
  
  
  //Adding The task to Blockchain
  const addtodo = async (title, desc, priority, status, value) => {
    await todoContract.methods.addTask(title.toString(), desc.toString(), priority.toString(), status, value).send({
      from: curruser,
    }).then((reciept) => {
      //Promise.all(fetchletesttask());
      alert("The Task has succesfully added..");
      //loadtodo();
    });
  };
  
  //lode all todo funtion
  const loadtodo = async () => { 
    const _todos = [];
    const length = await gettasklength(); 
    console.log(length);
    let i;
    for (i = length-1; i >= 0; i--) {
      let tasksdet = await todoContract.methods.getTask(i).call();
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
  const deletetodo = async (id)=>{
    //console.log("id:- " + id);
    await todoContract.methods.deleteTask(id).send({
      from: curruser
    });
    loadtodo();
    //console.log(delitm);
  }

  //updating Todo item..
  const updateitm = async (id, title, desc, priority, status, value)=>{
    console.log("Haahaa") 
    await todoContract.methods.updateTask(id, title, desc, priority,status,value).send({
      from: curruser
    })
  }


  return (
    <div className="App">
      <Header user={curruser} />
      <AddTodo addtodo={addtodo} loadtodo={loadtodo}/>
      <Todos todos={todos} deleteitm={deletetodo} updateitm={updateitm}/>
    </div>
  );
}

export default App;
