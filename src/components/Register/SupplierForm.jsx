import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

export default function SupplierForm({ addSupplier }) {
  const [publicKey, setPublicKey] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierAdd, setSupplierAdd] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [moq, setMoq] = useState(0);
  const [leadTime, setLeadTime] = useState(0);
  const [fromDeliveryDay, setFromDeliveryDay] = useState("Monday");
  const [toDeliveryDay, setToDeliveryDay] = useState("Sunday");
  const [remarks, setRemarks] = useState("-");

  const register = async (event) => {
    var deliveryDays = fromDeliveryDay + "-" + toDeliveryDay;
    const { create } = require("ipfs-http-client");
    const ipfs = create({
      host: "ipfs.infura.io",
      port: "5001",
      protocol: "https",
    });
    const metaObj = {
      name: supplierName,
      addressLocation: supplierAdd,
      phone: phoneNo,
      MOQ: moq,
      leadTime: leadTime,
      deliveryDays: deliveryDays,
      remarks: remarks,
    };
    const jsonObj = JSON.stringify(metaObj);
    const profileHash = await ipfs.add(jsonObj);
    console.log("JSON hash: ", profileHash.path);
    addSupplier(publicKey, profileHash.path);
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
        <label>Minimum Order (SGD)</label>
        <input
          type="number"
          min="0"
          className="form-control"
          placeholder="Enter minimum order"
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
