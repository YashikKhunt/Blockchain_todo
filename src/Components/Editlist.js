import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { Button, FormControl, InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import '../Styles/popup.css';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        backgroundColor: 'white',
        color: 'black',
        padding: '20px',
        height: '100%',
        width: '100%'
    },
});


function Editlist({ id, updateitm, close, todo, addtodo }) {

    const { handleSubmit, control, errors, register, reset } = useForm();
    const [value, setValue] = useState( new Date())

    const classes = useStyles();

    const onSubmit = (data) => {
        //console.log(value);
        let dateto = (value.$D + "/" + (value.$M + 1) + "/" + value.$y).toString();
        data.status === "true" ? data.status = true : data.status = false;

        if(id === null){
            console.log(data);
            addtodo(data.title, data.desc, data.priority, data.status, dateto).then(()=>{
                close();
            })
        }else {
            updateitm(id, data.title, data.desc, data.priority, data.status, dateto).then(() => {
                close();
            });
        }
        
    };

    return (
        <Container maxWidth="md" className={classes.root}>
            <h3>Update your todo Here </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    id ?
                        <Box mb={1}>
                            <TextField
                                variant='outlined'
                                name='id'
                                fullWidth
                                label={id}
                                disabled
                            />
                        </Box>
                        : null
                }

                <Box mb={1}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Date"
                            value={value}
                            disablePast
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            //inputFormat={id ? todo.date :`D/M/YYYY`}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>
                </Box>

                <Box mb={1}>
                    <Controller
                        name='title'
                        control={control}
                        render={
                            ({ field }) => (
                                <TextField
                                    {...field}
                                    label="Task Title.."
                                    fullWidth
                                    defaultValue={!todo ? "" : todo.title}
                                />
                            )
                        }
                    />
                </Box>

                <Box mb={1}>
                    <Controller
                        name='desc'
                        control={control}
                        render={
                            ({ field }) => (
                                <TextField
                                    {...field}
                                    label="Description"
                                    fullWidth
                                    defaultValue={!todo ? "" : todo.desc}
                                />
                            )
                        }
                    />
                </Box>

                <Box mb={1}>

                    <FormControl fullWidth >

                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            variant='outlined'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Status"
                            name='status'
                            fullWidth
                            {...register("status", { required: "Required" })}
                            error={!!errors?.status}
                            helperText={errors?.status ? "Please Enter satus" : null}
                            defaultValue={!todo ? "false" : todo.status==="Completed" ? "true" : "false"}
                        >
                            <MenuItem value={"true"} >Completed</MenuItem>
                            <MenuItem value={"false"}>Not Completed</MenuItem>
                        </Select>
                    </FormControl>

                </Box>

                <Box mb={1}>
                    <FormControl fullWidth >

                        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                        <Select
                            variant='outlined'
                            label="priority"
                            name='priority'
                            fullWidth
                            {...register("priority", { required: "Required" })}
                            error={!!errors?.priority}
                            helperText={errors?.priority ? "Please Enter priority" : null}
                            defaultValue={!todo ? "" : todo.priority==="Low" ? "Low" : todo.priority==="Medium" ? "Medium": "High"}
                        >
                            <MenuItem value={"Low"} >Low</MenuItem>
                            <MenuItem value={"Medium"}>Medium</MenuItem>
                            <MenuItem value={"High"}>High</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box mb={1}>{
                    !id 
                    ? 
                    <Button variant="contained" id="submit" type='submit' color='success' fullWidth onClick={addtodo}>  Add Todo </Button>
                    :
                    <Button variant="contained" id="submit" type='submit' color='success' fullWidth onClick={updateitm}>  Update </Button>
                }
                </Box>
            </form>
        </Container>
    )
}

export default Editlist