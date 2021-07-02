import React from "react";
import "./Rest.css";
import logo from "../logo.svg";
import blockchainlogo from "../blockchainlogo.png";

function Home() {
  return (
    <div>
      <img
        src={blockchainlogo}
        className="App-logo"
        width="200"
        height="60"
        alt="logo"
      />
      <h1 className="header">Hawker's Home</h1>
      <h2 style={{ color: "#808080" }}>Sales</h2>
      <h2 style={{ color: "#808080" }}>Transactions History</h2>
    </div>
  );
}

export default Home;
