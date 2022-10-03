import React from 'react';
import Card from '../UI/Card';
import Axios from 'axios';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Vow(props)
{
    function deleteVow(id)
    {
        Axios.delete(`http://localhost:3001/api/vows/delete/${id}`)
        window.location.reload();
    }
    const id= props.value.id;
    const date = new Date(props.value.date);
    const amount = props.value.amount;
    const parasha = props.value.parasha;
    return (
        <div>
            <Card>
                <b>תאריך: </b>
                <span id="date">{date.toLocaleDateString("en-GB")}</span><br></br>
                <b>סכום: </b>
                <span id="amount">{amount}</span><br></br>
                <b>פרשת השבוע: </b>
                <span id="parasha">{parasha}</span>
                <IconButton aria-label="מחק תשלום"  id="delete-button" onClick={() => {deleteVow(id)}}>
                    <DeleteIcon />
                </IconButton>
            </Card>
        </div>
    )
}