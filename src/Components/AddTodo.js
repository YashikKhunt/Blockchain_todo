import React, { useState } from 'react'
import '../Styles/Header.css';
import { Button, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function AddTodo(props) {

    const [title, settitle] = useState("");
    const [desc, setdesc] = useState("");
    const [status, setStatus] = useState("");
    //const [startDate, setStartDate] = useState(null);
    const [priority,setPriority] = useState("");

    const submit = (e)=> {
        e.preventDefault();
        if (!title) {
            alert("All the detailed should be filled")
        } else {
            props.addtodo(title, desc, priority, status); // this is the back
            settitle("");
            setdesc("");
            setStatus("");
            //setStartDate(null);
            setPriority(null);
            //putintoweb3();
        }
    }


    return (
        <div className='todo-main'>
            <h3>Add Todo Here </h3>
            <FormControl>
                <div className='form-style'>
                    <TextField value={title} onChange={(e) => settitle(e.target.value)} id="outlined-basic" label="Title" variant="outlined" className='text-field' />
                </div>
                <div className='form-style'>
                    <TextField value={desc} onChange={(e) => setdesc(e.target.value)} id="outlined-basic" label="Description" variant="outlined" className='text-field' />
                </div>
                <div className='form-style'>
                    {/* <InputLabel id="demo-simple-select-label text-field" >Age</InputLabel> */}
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        className='text-field'
                        placeholder='Enter status'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <MenuItem value={"Complete"}>Complete</MenuItem>
                        <MenuItem value={"NotComplete"}>Not Complete</MenuItem>
                    </Select>
                </div>
                <div className='form-style'>
                    {/* <InputLabel id="demo-simple-select-label text-field" >Age</InputLabel> */}
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        className='text-field'
                        placeholder='Enter priority'
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <MenuItem value={"Low"} >Low</MenuItem>
                        <MenuItem value={"Medium"}>Medium</MenuItem>
                        <MenuItem value={"High"}>High</MenuItem>
                    </Select>
                </div>
                <div className='form-style'>
                    <Button variant="contained" onClick={submit}> Add</Button>
                </div>
            </FormControl>

        </div>
    )


}

export default AddTodo