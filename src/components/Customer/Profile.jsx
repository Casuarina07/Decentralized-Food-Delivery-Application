import React, { useState } from "react";
import "./Cust.css";
import { FaUserCircle } from "react-icons/fa";

export default function Profile({ account }) {
  return (
    <div style={{ marginTop: 20, marginBottom: 30 }}>
      <FaUserCircle size={60} color="#016094" />
      <h3 className="header">{account}</h3>
      <h4 style={{ color: "#016094", marginTop: 30 }}>Profile Details</h4>
    </div>
  );
}
