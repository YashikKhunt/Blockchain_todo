import * as React from 'react'
import '../Styles/Header.css';
import AppBar from '@mui/material/AppBar';

function Header(props) {
    return (
        <AppBar position='static' color='transparent'>
            <div id='headerdiv'>
                <div id='header'>Todo-List</div>
                <div id='address'>Address :- {props.user}</div>
            </div>
        </AppBar>
    )
}

export default Header