import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import '../Styles/Header.css';

function AddTodo(props) {
    const { register, handleSubmit, formState: { errors }, control } = useForm();

    // const [title, settitle] = useState("");
    // const [desc, setdesc] = useState("");
    // const [status, setStatus] = useState(false);
    //const [startDate, setStartDate] = useState(null);
    // const [priority, setPriority] = useState("");


    const onSubmit = (data) => {
        props.addtodo(data.title, data.desc, data.priority, data.status);
        console.log(data.title);
    };

    // const submit = (e) => {
    //     e.preventdefault()
    //     props.addtodo(title, desc, priority, status); // this is the back
    //     settitle("");
    //     setdesc("");
    //     setStatus("");
    //     //setStartDate(null);
    //     setPriority(null);
    // }


    return (
        <Container maxWidth="md">
            <h3>Add Todo Here </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb={1}>
                    <Controller
                        render={({ field }) => <TextField {...field} label="Enter title" fullWidth />}
                        name="title"
                        control={control}
                        defaultValue=""
                    />
                </Box>
                <Box mb={1}>
                    <Controller
                        render={({ field }) => <TextField {...field} label="Description" fullWidth/>}
                        name="desc"
                        control={control}
                        defaultValue=""
                    />
                </Box>
                <Box mb={1}>
                    {/* <InputLabel id="demo-simple-select-label text-field" >Age</InputLabel> */}
                    {/* <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        className='text-field'
                        placeholder='Enter status'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        defaultValue="Select"
                    >
                        <MenuItem value={true}>Complete</MenuItem>
                        <MenuItem value={false}>Not Complete</MenuItem>
                    </Select> */}
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => <Select {...field} fullWidth >
                            <MenuItem value={true}>Complete</MenuItem>
                            <MenuItem value={false}>Not Complete</MenuItem>
                        </Select>
                        }
                    />
                </Box>
                <Box mb={1}>
                    {/* <InputLabel id="demo-simple-select-label text-field" >Age</InputLabel> */}
                    {/* <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        className='text-field'
                        placeholder='Enter priority'
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        defaultValue="Select"
                    >
                        <MenuItem value={"Low"} >Low</MenuItem>
                        <MenuItem value={"Medium"}>Medium</MenuItem>
                        <MenuItem value={"High"}>High</MenuItem>
                    </Select> */}
                    <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => <Select {...field} fullWidth>
                            <MenuItem value={"Low"} >Low</MenuItem>
                            <MenuItem value={"Medium"}>Medium</MenuItem>
                            <MenuItem value={"High"}>High</MenuItem>
                        </Select>
                        }
                    />
                </Box>
                <div className='form-style'>
                    <Button variant="contained" id="submit" type='submit'> Add</Button>
                </div>
                <div className='form-style'>
                    <Button variant="contained" onClick={props.loadtodo} id="submit"> Get Tasks</Button>
                </div>
            </form>

        </Container>
    )


}

export default AddTodo