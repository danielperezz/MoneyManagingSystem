import React, { useState } from 'react';
import Axios from 'axios';
import Card from '../UI/Card';
import './NewVow.css'

export default function NewVow(props)
{
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [parasha, setParsha] = useState('')

    function addNewVow()
    {
        Axios.post("http://localhost:3001/api/vows/insert",
        {   memberID: props.id,
            amount: amount,
            date: date,
            parasha: parasha,
        })
        window.location.reload();
        // props.setMembersVowsList([...props.membersVowsList, {memberID: props.id, parasha:parasha}]);
        // setAmount('');
        // setDate('');
        // setParsha('');
        // setReceipt('')
    }

    return (
        <div>
            <Card className="new-vow-card">
            <b>הזנת נדר</b><br></br><br></br>
            
            <label>סכום: </label>
            <input type="number" value={amount}onChange={(e)=> {setAmount(e.target.value);}}/><br></br>

            <label>תאריך: </label>
            <input type="date" value={date} onChange={(e)=> {setDate(e.target.value);}}/><br></br>
            
            <label>פרשת השבוע: </label>
            <input type="text" value={parasha} onChange={(e)=> {setParsha(e.target.value);}}/><br></br><br></br>

            <button onClick={addNewVow}>שלח</button>
            </Card>
        </div>
    )
}