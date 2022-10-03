import Card from '../UI/Card';
import { Link } from "react-router-dom";

import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import './Member.css'

export default function Member(props)
{
    const value = props.value;
    return (
        <div>
            <Card>
                <b> שם פרטי: </b>
                <span>{value.firstName}</span><br></br>
                <b>שם משפחה: </b>
                <span>{value.lastName}</span><br></br>
                <b>מספר טלפון: </b>
                <span>{value.phoneNumber}</span><br></br>
                <Link to={`/members/${value.id}`} id="to-member-button">
                <IconButton aria-label="עבור לעמוד חבר">
                    <ExitToAppIcon id="exit-icon" />
                </IconButton>
                </Link>
            </Card>
        </div>
    )
}