import React from "react";
import logo from "../logo.svg";
import blockchainlogo from "../blockchainlogo.png";
import { Row, Col } from "react-bootstrap";

import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

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
      <h1 className="header">Food Delivery's Home</h1>
    </div>
  );
}

export default Home;
