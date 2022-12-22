import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import '../Styles/Header.css';


function AddTodo(props) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [value, setValue] = useState()
    //console.log(value)

    
    const onSubmit = (data) => {
        let dateto = (value.$D + "/" + (value.$M + 1) + "/" + value.$y).toString();
        data.status === "true" ? data.status = true : data.status = false;
        props.addtodo(data.title, data.desc, data.priority, data.status, dateto);
        console.log(dateto);
        reset();
    };

    return (
        <Container maxWidth="md">
            <h1>Add Todo Here </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb={1}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Date"
                            value={value}
                            disablePast
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>
                </Box>
                <Box mb={1}>
                    <TextField
                        variant='outlined'
                        label="Title"
                        name='title'
                        fullWidth
                        {...register("title", { required: "Required" })}
                        error={!!errors?.title}
                        helperText={errors?.title ? "Please Enter Title" : null}
                    />
                </Box>
                <Box mb={1}>
                    <TextField
                        variant='outlined'
                        label="Description"
                        name='desc'
                        fullWidth
                        {...register("desc", { required: "Required" })}
                        error={!!errors?.desc}
                        helperText={errors?.desc ? "Please Enter description" : null}
                    />
                </Box>
                <Box mb={1}>
                    <Select
                        variant='outlined'
                        // label="Status"
                        name='status'
                        fullWidth
                        {...register("status", { required: "Required" })}
                        error={!!errors?.status}
                        helperText={errors?.status ? "Please Enter satus" : null}
                        defaultValue=""
                    >
                        <MenuItem value={"true"} >Complete</MenuItem>
                        <MenuItem value={"false"}>Not Complete</MenuItem>
                    </Select>
                </Box>
                <Box mb={1}>
                    <Select
                        variant='outlined'
                        // label="priority"
                        name='priority'
                        fullWidth
                        {...register("priority", { required: "Required" })}
                        error={!!errors?.priority}
                        helperText={errors?.priority ? "Please Enter priority" : null}
                        defaultValue=""
                    >
                        <MenuItem value={"Low"} >Low</MenuItem>
                        <MenuItem value={"Medium"}>Medium</MenuItem>
                        <MenuItem value={"High"}>High</MenuItem>
                    </Select>
                </Box>
                <Box mb={1}>
                    <Button variant="contained" id="submit" type='submit' color='success' fullWidth> Add</Button>
                </Box>
                <Box mb={1}>
                    <Button variant="contained" onClick={props.loadtodo} id="submit" color='info' fullWidth> Refresh Task</Button>
                </Box>
            </form>

        </Container>
    )


}

export default AddTodo