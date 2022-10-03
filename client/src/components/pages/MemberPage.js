import React, { useState , useEffect } from 'react';
import { useParams } from 'react-router';
import Axios from 'axios';
import {  Link } from "react-router-dom";

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import './MemberPage.css'

import NewPayment from '../inserts/NewPayment';
import NewVow from  '../inserts/NewVow';
import Vow from '../lists-items/Vow';
import Payment from '../lists-items/Payment';
import Card from '../UI/Card';

export default function MemberPage()
{
    function deleteMember(id)
    {
      Axios.delete(`http://localhost:3001/api/members/delete/${id}`)
    }

    // function updateMember(id, firstName, lastName, phoneNumber)
    // {
    //   // need to open a toggle to update by id
    //   setFirstName(firstName);
    //   setLastName(lastName);
    //   setPhoneNumber(phoneNumber);
    //   Axios.put(`http://localhost:3001/api/update`,{firstName: COMPLETE})
    // }

    const {id} = useParams();
    // const [totalDebt, setTotalDebt] = useState('')
    const [membersVowsList, setMembersVowsList] = useState([])
    const [membersPaymentsList, setMembersPaymentsList] = useState([])
    const [membersDetails, setMembersDetails] = useState({})
    const [totalDebt, setTotalDebt] = useState(0)

    useEffect(()=>
    {
        Axios.get(`http://localhost:3001/api/vows/get/${id}`).then((response)=>
        {
            setMembersVowsList(response.data)
        })
        Axios.get(`http://localhost:3001/api/payments/get/${id}`).then((response)=>
        {
            setMembersPaymentsList(response.data)
        }) 
        Axios.get(`http://localhost:3001/api/members/get/${id}`).then((response)=>
        {
            setMembersDetails(response.data[0])
        }) 
        
    }, [id])
    
    let vowsAmountsList = membersVowsList.map(a => a.amount);
    let paymentsAmountsList = membersPaymentsList.map(a => a.amount);
    const vowsSum = vowsAmountsList.reduce((partialSum, a) => partialSum + a, 0);
    const paymentsSum = paymentsAmountsList.reduce((partialSum, a) => partialSum + a, 0);
    let total = ((vowsSum-paymentsSum)<0 ? 0 : (vowsSum-paymentsSum))
    useEffect(()=>
    {
        setTotalDebt(total)
    }, [total])

    return (
        <div>
            <Card className="member-details-header">
            <b>שם: </b>
            <span>{membersDetails.firstName} {membersDetails.lastName}</span><br></br>
            <b>יתרה לתשלום: </b>
            <span>{totalDebt}</span><br></br> 
            <Link reloadDocument to={'/members'} id="delete-member-button" onClick={() => window.location.reload()}> 
                <IconButton aria-label="מחק משתמש" id="delete-icon" onClick={() => {deleteMember(id)}}>
                    <DeleteIcon />
                </IconButton>
            </Link> 
            <IconButton aria-label="ערוך פרטי משתמש" id="edit-button" onClick={() => {}}>
                    <BorderColorIcon id="edit-icon" />
            </IconButton>
            
            </Card>
            <table>
                <tbody>
                <tr>
                    <th>תשלומים</th>
                    <th>נדרים</th>
                </tr>
                <tr>
                    <td>
                        <NewPayment id={id} membersPaymentsList={membersPaymentsList} setMembersPaymentsList={setMembersPaymentsList}/>
                    </td>
                    <td>
                        <NewVow id={id} membersVowsList={membersVowsList} setMembersVowsList={setMembersVowsList} />
                    </td>
                </tr>
                <tr>
                    <td>
                        {membersPaymentsList.map((value) =>
                        {
                            return (
                            <div key={value.id}>
                                <Payment value={value} />
                            </div>
                            )
                        })}
                    </td>
                    <td>
                        {membersVowsList.map((value)=>
                        { 
                            return (
                            <div key={value.id}>
                                <Vow value={value}/>
                            </div>
                            )
                        })}
                    </td>
                </tr>
                </tbody>
            </table>
            
        </div>
    )
}