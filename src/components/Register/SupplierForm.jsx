import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

export default function SupplierForm({ addSupplier }) {
  const [publicKey, setPublicKey] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierEmail, setSupplierEmail] = useState("");
  const [supplierAdd, setSupplierAdd] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [moq, setMoq] = useState(0);
  const [leadTime, setLeadTime] = useState(0);
  const [fromDeliveryDay, setFromDeliveryDay] = useState("Monday");
  const [toDeliveryDay, setToDeliveryDay] = useState("Sunday");
  const [remarks, setRemarks] = useState("-");

  const register = (event) => {
    var deliveryDays = fromDeliveryDay + "-" + toDeliveryDay;
    addSupplier(
      publicKey,
      supplierName,
      supplierEmail,
      supplierAdd,
      phoneNo,
      moq,
      leadTime,
      deliveryDays,
      remarks
    );
  };
  const handleChangeFrom = (event) => {
    setFromDeliveryDay(event.target.value);
  };
  const handleChangeTo = (event) => {
    setToDeliveryDay(event.target.value);
  };
  return (
    <div>
      <div className="form-group">
        <label>Public Key</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Public Key"
          required
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
          required
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
          required
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
          required
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
          required
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
          required
          onChange={(e) => {
            setMoq(e.target.value);
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
          required
          onChange={(e) => {
            setLeadTime(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Delivery Days </label>
        <div>
          <select
            style={{ marginRight: 5 }}
            value={fromDeliveryDay}
            onChange={handleChangeFrom}
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          -
          <select
            id="dropdown"
            style={{ marginRight: 5, marginLeft: 5 }}
            value={toDeliveryDay}
            onChange={handleChangeTo}
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Additional Remarks</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter remarks"
          onChange={(e) => {
            setRemarks(e.target.value);
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
