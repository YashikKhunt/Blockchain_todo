import { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import AddTodo from './Components/AddTodo';
import {CONTRACT_ADDRESS,CONTRACt_ABI,todoContract,web3} from './getweb3.js';



function App() {

  //state hooks
  const [curruser, setUser] = useState('');


  useEffect( ()=> {
    getuserdetial().then((data)=>{
      setUser(data);
    });
    //console.log(curruser);
  },[]);  /// not working properly

  const getuserdetial = async ()=> {
    const account = await web3.eth.getAccounts();
    return account;
  }

  const addtodo = async (title, desc,  priority, status) => {
    //logic..todos={todos}
    const tx = await todoContract.methods.getTask(0).call();
    await tx.wait();
    console.log(tx);
  };

  return (
    <div className="App">
      <Header user={curruser}/>
      {/* <AddTodo addtodo={addtodo} /> */}
    </div>
  );
}

export default App;
