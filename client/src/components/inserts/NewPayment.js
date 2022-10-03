import React, { useState } from 'react';
import Axios from 'axios';
import Card from '../UI/Card';

export default function NewPayment(props)
{
    const paymentsOptions = [{value: "", label:""},{value: 'cash', label: 'מזומן'}, {value: 'transfer', label:'העברה בנקאית'}]
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const [receipt, setReceipt] = useState('')

    function addNewPayment()
    {
        Axios.post("http://localhost:3001/api/payments/insert",
        {   memberID: props.id,
            amount: amount,
            date: date,
            method: paymentMethod,
        })
        window.location.reload();
        // props.setMembersPaymentsList([...props.membersPaymentsList, {memberID: props.id, amount: amount, date: date, method: paymentMethod, receipt: receipt}]);
        // setAmount('');
        // setDate('');
        // setPaymentMethod('');
        // setReceipt('')
    }

    return (
        <div>
            <Card className="new-payment-card">
            <b>הזנת תשלום</b><br></br><br></br>
            <label>סכום: </label>
            <input type="number" value={amount} onChange={(e)=> {setAmount(e.target.value);}}/><br></br>
            
            <label>תאריך: </label>
            <input type="date" value={date} onChange={(e)=> {setDate(e.target.value);}}/><br></br>
            
            <label>שיטת התשלום: </label>
            <select value={paymentMethod} onChange={(e)=> {
                setPaymentMethod(e.target.value);}}>
                {paymentsOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select><br></br>

            <label> האם הודפסה קבלה</label>
            <input type="checkbox" value={receipt}onChange={(e)=> {setReceipt(e.target.value);}}/><br></br><br></br>
            <button onClick={addNewPayment}>שלח</button>
            </Card>
        </div>
    )
}