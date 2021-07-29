import React, { useState } from "react";

export default function SupplierForm({ addSupplier }) {
  const [publicKey, setPublicKey] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierEmail, setSupplierEmail] = useState("");
  const [supplierAdd, setSupplierAdd] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [moq, setMoq] = useState(0);
  const [leadTime, setLeadTime] = useState(0);

  const register = (event) => {
    addSupplier(publicKey, supplierName, supplierEmail, supplierAdd, phoneNo);
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
            setSupplierName(e.target.value);
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
            setSupplierEmail(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter company address"
          onChange={(e) => {
            setSupplierAdd(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter phone number"
          onChange={(e) => {
            setPhoneNo(e.target.value);
          }}
        />
      </div>

      <b>Delivery Details: </b>

      <div className="form-group" style={{ marginTop: 10 }}>
        <label>MOQ (SGD)</label>
        <input
          type="number"
          min="0"
          className="form-control"
          placeholder="Enter mininum order quantity"
          onChange={(e) => {
            setPhoneNo(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Lead Time (Days)</label>
        <input
          type="number"
          min="1"
          className="form-control"
          placeholder="Enter lead time"
          onChange={(e) => {
            setLeadTime(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Delivery Days</label>
        <input
          type="number"
          min="1"
          className="form-control"
          placeholder="Enter lead time"
          onChange={(e) => {
            setLeadTime(e.target.value);
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
