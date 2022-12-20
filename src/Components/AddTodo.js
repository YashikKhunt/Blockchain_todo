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
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        data.status==="true" ? data.status=true : data.status=false;
        props.addtodo(data.title, data.desc, data.priority, data.status);
        console.log(data);
        reset();
    };

    return (
        <Container maxWidth="md">
            <h3>Add Todo Here </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb={1}>
                    {/* <Controller
                        render={({ field }) => <TextField {...field} label="Enter title" fullWidth />}
                        name="title"
                        control={control}
                        defaultValue=""
                    /> */}
                    <TextField 
                        variant='outlined'
                        label="Title"
                        name='title'
                        fullWidth
                        {...register("title", { required: "Required"})}
                        error={!!errors?.title}
                        helperText={errors?.title ? "Please Enter Title" : null}
                    />
                </Box>
                <Box mb={1}>
                    {/* <Controller
                        render={({ field }) => <TextField {...field} label="Description" fullWidth/>}
                        name="desc"
                        control={control}
                        defaultValue=""
                    /> */}
                    <TextField
                        variant='outlined'
                        label="Description"
                        name='desc'
                        fullWidth
                        {...register("desc",{ required: "Required"})}
                        error={!!errors?.desc}
                        helperText={errors?.desc ? "Please Enter description" : null}
                    />
                </Box>
                <Box mb={1}>
                    {/* <Controller
                        name="status"
                        control={control}
                        render={({ field }) => <Select {...field} fullWidth >
                            <MenuItem value={true}>Complete</MenuItem>
                            <MenuItem value={false}>Not Complete</MenuItem>
                        </Select>
                        }
                    /> */}
                    <Select
                        variant='outlined'
                        // label="Status"
                        name='status'
                        fullWidth
                        {...register("status", { required: "Required"})}
                        error={!!errors?.status}
                        helperText={errors?.status ? "Please Enter satus" : null}
                        defaultValue={"select"}
                        >
                        <MenuItem value={"true"} >Complete</MenuItem>
                        <MenuItem value={"false"}>Not Complete</MenuItem>
                    </Select>
                </Box>
                <Box mb={1}>
                    {/* <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => <Select {...field} fullWidth>
                            <MenuItem value={"Low"} >Low</MenuItem>
                            <MenuItem value={"Medium"}>Medium</MenuItem>
                            <MenuItem value={"High"}>High</MenuItem>
                        </Select>
                        }
                    /> */}
                    <Select
                        variant='outlined'
                        // label="priority"
                        name='priority'
                        fullWidth
                        {...register("priority", { required: "Required"})}
                        error={!!errors?.priority}
                        helperText={errors?.priority ? "Please Enter priority" : null}
                        defaultValue={"select"}
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
                    <Button variant="contained" onClick={props.loadtodo} id="submit" color='info' fullWidth> Get Tasks</Button>
                </Box>
            </form>

        </Container>
    )


}

export default AddTodo