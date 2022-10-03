import React from 'react';
import Card from '../UI/Card';
import Axios from 'axios';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import './Payment.css'

export default function Payment(props)
{
    function deletePayment(id)
    {
        Axios.delete(`http://localhost:3001/api/payments/delete/${id}`)
        window.location.reload();
    }
    const id= props.value.id;
    const date = new Date(props.value.date);
    const amount = props.value.amount;
    let paymentMethod = props.value.paymentMethod;
    switch(paymentMethod)
    {
        case "tranfer":
            paymentMethod="העברה בנקאית"
            break;
        case "cash":
            paymentMethod="מזומן"
            break;
        default:
            break;
    }
    let receipt = props.receipt
    if(receipt===1)
    {
        receipt= "כן";
    } else
    {
        receipt="לא"
    }
    return (
        <div>
            <Card>
                <b>תאריך: </b>
                <span>{date.toLocaleDateString("en-GB")}</span><br></br>
                <b>סכום: </b>
                <span>{amount}</span><br></br>
                <b> שיטת התשלום:</b>
                <span> {paymentMethod}</span><br></br>
                <b>קבלה: </b>
                <span>{receipt}</span><br></br>
                <IconButton aria-label="מחק תשלום"  id="delete-button" onClick={() => {deletePayment(id)}}>
                    <DeleteIcon />
                </IconButton>
            </Card>
        </div>
    )
}