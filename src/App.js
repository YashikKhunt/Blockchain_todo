import { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import AddTodo from './Components/AddTodo';
import Todos from './Components/Todos';
import { todoContract, web3 } from './getweb3.js';



function App() {

  //state hooks
  const [curruser, setUser] = useState('');
  const [length, setLength] = useState(0);

  const [todos, settodos] = useState([]);
  let count;
  //let todos = [];


  useEffect(() => {
    //console.log("useEffect")
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
    setLength(count);
    return count;
  }


  //Adding The task to Blockchain
  const addtodo = async (title, desc, priority, status) => {
    const tx = await todoContract.methods.addTask(title.toString(), desc.toString(), priority.toString(), status).send({
      from: curruser
    }).then((reciept) => {
      alert("The Task has succesfully added..");
    });
  };


  //lode all todo funtion
  const loadtodo = async () => { 
    const _todos = [];
    const length = await gettasklength();
    let i;
    for (i = length-1; i >= 0; i--) {
      let tasksdet = await todoContract.methods.getTask(i).call();
      let myTodo = {
        id: parseInt(tasksdet.id),
        title: tasksdet.title,
        status: (tasksdet.status) ? "Completed" : "Not Completed",
        desc: tasksdet.desc,
        priority: tasksdet.priority
      }
      _todos.push(myTodo);
    }
    settodos(_todos);
    //console.log(_todos);

  };


  return (
    <div className="App">
      <Header user={curruser} />
      <AddTodo addtodo={addtodo} loadtodo={loadtodo}/>
      <Todos todos={todos}/>
    </div>
  );
}

export default App;
