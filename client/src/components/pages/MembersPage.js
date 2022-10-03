import React, { useState , useEffect } from 'react';
import Axios from 'axios';
import Member from '../lists-items/Member';
import NewMember from '../inserts/NewMember';

import './MembersPage.css'

export default function MembersPage()
{
    
    const [membersList, setMembersList] = useState([])
    useEffect(()=>
    {
      Axios.get("http://localhost:3001/api/members/get").then((response)=>
      {
        if(response.data.length>0)
        {
          setMembersList(response.data);
        }
      })
    }, [])
  
    return (
      <div>
        <NewMember membersList={membersList} setMembersList={setMembersList}/>
          <div className='container'>
            {membersList.map((value)=>
            { 
              return (
                <div key={value.id}>
                  <Member value={value}/>
                </div>
                )
            })}
          </div>
        </div>
    )
    
}
