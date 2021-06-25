import React from "react";
import "./Rest.css";
import { FaUserCircle } from "react-icons/fa";

function Profile({ account }) {
  return (
    <div style={{ marginTop: 20 }}>
      <FaUserCircle size={60} color="#016094" />
      <h2 className="header">Public Key: </h2>
      <div className="header">{account}</div>
      <div></div>
    </div>
  );
}

export default Profile;
