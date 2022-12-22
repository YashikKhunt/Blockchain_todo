import React, {useState} from 'react'
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@mui/material';
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

const STATUS = [
    { text: "Complete", value: "true" },
    { text: "Not Complete", value: "false" }
];

const PRIORITY = [
    { text: "Low", value: "Low" },
    { text: "Medium", value: "Medium" },
    { text: "High", value: "High" },
];


function Editlist({ id, updateitm, close }) {

    const { handleSubmit, control } = useForm();
    const [value, setValue] = useState()

    const classes = useStyles();
    
    const onSubmit = (data) => {
        let dateto = (value.$D +"/"+(value.$M+1)+"/"+value.$y).toString();
        data.status === "true" ? data.status = true : data.status = false;
        updateitm(id, data.title, data.desc, data.priority, data.status, dateto).then(()=>{
            close();
        });
    };

    return (
        <Container maxWidth="md" className={classes.root}>
            <h3>Update your todo Here </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb={1}>
                    <TextField
                        variant='outlined'
                        name='id'
                        fullWidth
                        label={id}
                        disabled
                    />
                </Box>
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
                    <Controller
                        name='title'
                        control={control}
                        render={
                            ({ field }) => (
                                <TextField
                                    {...field}
                                    label="Task Title.."
                                    fullWidth
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
                                />
                            )
                        }
                    />
                </Box>
                <Box mb={1}>
                    <Controller
                        name='status'
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                defaultValue=""
                                fullWidth
                            >
                                {
                                    STATUS.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>
                                            {option.text}
                                        </MenuItem>
                                    ))
                                }
                            </Select>)
                        }
                    />

                </Box>
                <Box mb={1}>
                    <Controller
                        name='priority'
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                defaultValue=""
                                fullWidth
                            >
                                {
                                    PRIORITY.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>
                                            {option.text}
                                        </MenuItem>
                                    ))
                                }
                            </Select>)
                        }
                    />
                </Box>
                <Box mb={1}>
                    <Button variant="contained" id="submit" type='submit' color='success' fullWidth> Update</Button>
                </Box>
            </form>
        </Container>
    )
}

export default Editlist