import React from 'react';
import './Rest.css';


function Profile({ account }) {
    return (
      <div>
        <h1 className="header">Public Key: </h1>
        <div className="header">{ account }</div>
      </div>
    );
}

export default Profile;