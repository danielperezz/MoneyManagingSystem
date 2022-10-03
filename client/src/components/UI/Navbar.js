import React from 'react';
import {  Link } from "react-router-dom";
import './Navbar.css'

import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';

export default function Navbar() {
  return (
  <div>
    <nav role="navigation" className="mainNav">
        <h3 id="header">האתר שלי</h3>
        <ul>
        <li>
                <Link id={"link-styles"} to="/">
                  <HomeIcon />
                </Link>
            </li>
            <li>
                <Link id={"link-styles"} to="/members">
                  <PeopleIcon />
                </Link>
            </li>
          </ul>
    </nav>
  </div>
  
  );
}
