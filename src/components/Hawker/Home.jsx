import React, { useState } from "react";
import "./Rest.css";
import logo from "../logo.svg";
import blockchainlogo from "../blockchainlogo.png";

function Home({ restProducts }) {
  let overallSales = 0;
  return (
    <div style={{ margin: 60, marginTop: 20 }}>
      {/* <img
        src={blockchainlogo}
        className="App-logo"
        width="200"
        height="60"
        alt="logo"
      /> */}
      <h1 className="header">Hawker's Home</h1>
      <div style={{ marginTop: 30 }}>
        <h2 style={{ color: "#808080" }}>Sales</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col"> Sold</th>
              <th scope="col">Total Sales</th>
            </tr>
          </thead>
          {restProducts.map((product, key) => {
            overallSales += product.price * product.soldCount;
            return (
              <tbody id="productList">
                <tr>
                  <td>{product.name}</td>
                  <td>{product.soldCount}</td>
                  <td>
                    {window.web3.utils.fromWei(
                      (product.price * product.soldCount).toString(),
                      "Ether"
                    )}{" "}
                    Eth
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
        <h4 style={{ display: "flex", justifyContent: "flex-end" }}>
          Overall Sales:{" "}
          {window.web3.utils.fromWei(overallSales.toString(), "Ether")} Eth
        </h4>
      </div>
      <div style={{ marginTop: 30 }}>
        <h2 style={{ color: "#808080" }}>Transactions History</h2>
      </div>
    </div>
  );
}

export default Home;
