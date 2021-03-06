import React, { useState } from "react";

export default function FdForm({ addFoodDelivery }) {
  const [publicKey, setPublicKey] = useState("");
  const [fdName, setFdName] = useState("");
  const [fdEmail, setFdEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const register = async (event) => {
    const { create } = require("ipfs-http-client");
    const ipfs = create({
      host: "ipfs.infura.io",
      port: "5001",
      protocol: "https",
    });
    const metaObj = {
      name: fdName,
      email: fdEmail,
      phone: phoneNo,
    };
    const jsonObj = JSON.stringify(metaObj);
    const profileHash = await ipfs.add(jsonObj);
    console.log("JSON hash: ", profileHash.path);
    addFoodDelivery(publicKey, profileHash.path);
  };
  return (
    <div>
      <div className="form-group">
        <label>Public Key</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Public Key"
          onChange={(e) => {
            setPublicKey(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter name"
          onChange={(e) => {
            setFdName(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => {
            setFdEmail(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter phone"
          onChange={(e) => {
            setPhoneNo(e.target.value);
          }}
        />
      </div>

      {/* <div className="form-group">
        <label>Delivery mode:</label>
        <input
          type="text "
          className="form-control"
          placeholder="Enter delivery mode"
        />
      </div> */}

      <button
        type="button"
        className="btn btn-primary btn-block"
        onClick={register}
      >
        Register
      </button>
    </div>
  );
}
