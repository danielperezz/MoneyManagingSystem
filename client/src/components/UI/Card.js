
import React from 'react';

import './Card.css';
 
export default function Card(props) {
  const classes = 'card ' + props.className;

  return (
  <div className={classes}>
    <div id="card-content">
      {props.children}
    </div>
  </div>
  )
};