import React, { useState } from "react";
import "./Cust.css";

export default function Cart({ account }) {
  return (
    <div style={{ marginTop: 20, marginBottom: 30 }}>
      <h3 className="header">{account}</h3>
      <h4 style={{ color: "#016094", marginTop: 30 }}>Cart</h4>
    </div>
  );
}
