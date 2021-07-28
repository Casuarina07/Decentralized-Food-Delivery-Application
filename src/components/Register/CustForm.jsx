import React, { useState } from "react";

export default function CustForm({ addCustomer }) {
  const [publicKey, setPublicKey] = useState("");
  const [custName, setCustName] = useState("");
  const [custAddress, setCustAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const register = (event) => {
    addCustomer(publicKey, custName, custAddress, phoneNo);
  };
  return (
    <div>
      <div className="form-group">
        <label>Public Key</label>
        <input
          type="text"
          className="form-control"
          placeholder="Public key"
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
          placeholder="Name"
          onChange={(e) => {
            setCustName(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          className="form-control"
          placeholder="Address"
          onChange={(e) => {
            setCustAddress(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="text"
          className="form-control"
          placeholder="Phone Number"
          onChange={(e) => {
            setPhoneNo(e.target.value);
          }}
        />
      </div>

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
