import React, { useState } from 'react';
import Axios from 'axios';
import Card from '../UI/Card';

import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

import './NewMember.css'

export default function NewMember({membersList, setMembersList})
{
    function registerMember(e)
    {
      Axios.post("http://localhost:3001/api/members/insert",
       {firstName: firstName,
         lastName: lastName,
          phoneNumber: phoneNumber
        }).then((response)=> {
            window.location.reload();
            // setMembersList([...membersList, {id: response.data.id, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber}]);
            // setFirstName('');
            // setLastName('');
            // setPhoneNumber('');
        })
        
    }

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    return (
        <div>
            <Card>
            <h3>הוספת חבר חדש</h3>
            <label>שם פרטי: </label>
            <input type="text" name="firstName" value={firstName} onChange={(e)=>
            {
                setFirstName(e.target.value);
            }}/>
            
            <label>שם משפחה: </label>
            <input type="text" name="lastName" value={lastName} onChange={(e)=>
            {
            setLastName(e.target.value);
            }}/>
            
            <label>מספר טלפון: </label>
            <input type="text" name="phoneNumber" value={phoneNumber} onChange={(e)=>
            {
            setPhoneNumber(e.target.value);
            }}/>
            
            <IconButton aria-label="שלח" onClick={registerMember}>
                    <SendIcon id="send-icon"/>
            </IconButton>
            </Card>
        </div>
    )
}