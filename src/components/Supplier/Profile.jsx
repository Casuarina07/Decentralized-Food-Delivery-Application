import React, { useState, useEffect } from "react";
import { BsFillPersonCheckFill } from "react-icons/bs";
import axios from "axios";

export default function Profile({ account, supplier, editSupplierProfile }) {
  const [editClicked, setEditClicked] = useState(false);
  const [supplierPhoneNo, setSupplierPhoneNo] = useState();
  const [supplierMoq, setSupplierMoq] = useState();
  const [supplierLeadTime, setSupplierLeadTime] = useState();
  const [deliveryDays, setDeliveryDays] = useState();
  const [fromDeliveryDay, setFromDeliveryDay] = useState("Monday");
  const [toDeliveryDay, setToDeliveryDay] = useState("Sunday");
  const [supplierName, setSupplierName] = useState();
  const [supplierRemarks, setSupplierRemarks] = useState();
  const [supplierDetails, setSupplierDetails] = useState([]);
  const [supplierAddress, setSupplierAddress] = useState();

  // const [custAddress, setCustAddress] = useState(custAdd);
  useEffect(() => {
    retrieveSupplierDetails();
  }, []);

  async function retrieveSupplierDetails() {
    const hi = axios
      .get("https://ipfs.infura.io/ipfs/" + supplier.profileHash)
      .then(function (response) {
        console.log("this is the data: ", response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    hi.then((details) => {
      setSupplierDetails(details);
      setSupplierName(details.name);
      setSupplierAddress(details.addressLocation);
      setSupplierPhoneNo(details.phone);
      setSupplierLeadTime(details.leadTime);
      setSupplierMoq(details.MOQ);
      setDeliveryDays(details.deliveryDays);
      setSupplierRemarks(details.remarks);
    });
  }

  function editProfile() {
    setEditClicked(!editClicked);
  }

  const saveChanges = async (evt) => {
    evt.preventDefault();
    var deliveryDays = fromDeliveryDay + "-" + toDeliveryDay;
    setDeliveryDays(deliveryDays);
    // editSupplierProfile(
    //   supplier.id,
    //   supplierPhoneNo,
    //   supplierMoq,
    //   supplierLeadTime,
    //   deliveryDays,
    //   supplierRemarks
    // );
    const { create } = require("ipfs-http-client");
    const ipfs = create({
      host: "ipfs.infura.io",
      port: "5001",
      protocol: "https",
    });
    const metaObj = {
      name: supplierName,
      addressLocation: supplierAddress,
      phone: supplierPhoneNo,
      MOQ: supplierMoq,
      leadTime: supplierLeadTime,
      deliveryDays: deliveryDays,
      remarks: supplierRemarks,
    };
    const jsonObj = JSON.stringify(metaObj);
    const profileHash = await ipfs.add(jsonObj);
    console.log("JSON hash: ", profileHash.path);
    editSupplierProfile(supplier.id, profileHash.path);
  };

  const handleChangeFrom = (event) => {
    setFromDeliveryDay(event.target.value);
  };

  const handleChangeTo = (event) => {
    setToDeliveryDay(event.target.value);
  };

  return (
    <div style={{ marginTop: 20, marginBottom: 30 }}>
      <BsFillPersonCheckFill size={60} color="#016094" />
      <h3 className="header">{account}</h3>
      <h4>Average Rating: {supplier.avgRating}</h4>
      <h4 style={{ color: "#016094", marginTop: 30 }}>Profile Details</h4>

      {editClicked ? (
        <div>
          <b>Name: </b>
          <div style={{ padding: 5 }}>
            <label>{supplierDetails.name}</label>
          </div>

          <b>Address: </b>
          <div>
            <label>{supplierDetails.addressLocation}</label>
          </div>

          <form onSubmit={saveChanges}>
            <b>Phone: </b>
            <div style={{ padding: 5 }}>
              <input
                type="text"
                value={supplierPhoneNo}
                onChange={(e) => setSupplierPhoneNo(e.target.value)}
              />
            </div>

            <b>MOQ ($):</b>
            <div style={{ padding: 5 }}>
              <input
                type="text"
                value={supplierMoq}
                onChange={(e) => setSupplierMoq(e.target.value)}
              />
            </div>

            <b>Lead Time (days): </b>
            <div style={{ padding: 5 }}>
              <input
                type="text"
                value={supplierLeadTime}
                onChange={(e) => setSupplierLeadTime(e.target.value)}
              />
            </div>

            <b>Delivery Days: </b>
            <div style={{ padding: 5 }}>
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

            <b>Additional Remarks: </b>
            <div style={{ padding: 5 }}>
              <textarea
                type="text"
                value={supplierRemarks}
                style={{ width: 250, height: 150 }}
                onChange={(e) => setSupplierRemarks(e.target.value)}
              />
            </div>

            <input
              style={{ marginTop: 20 }}
              type="submit"
              className="btn btn-primary"
              value="Save Changes"
            />
          </form>
          <button
            type="submit"
            className="btn"
            onClick={editProfile}
            style={{ margin: 10, background: "#e7e7e7" }}
          >
            Exit Changes
          </button>
        </div>
      ) : (
        <div>
          <b>Name: </b>
          <div style={{ padding: 5 }}>
            <label>{supplierDetails.name}</label>
          </div>
          <b>Address: </b>
          <div style={{ padding: 5 }}>
            <label>{supplierDetails.addressLocation}</label>
          </div>
          <b>Phone: </b>
          <div style={{ padding: 5 }}>
            <label>{supplierDetails.phone}</label>
          </div>
          <b>MOQ ($):</b>
          <div style={{ padding: 5 }}>
            <label>{supplierDetails.MOQ}</label>
          </div>
          <b>Lead Time (days): </b>
          <div style={{ padding: 5 }}>
            <label>{supplierDetails.leadTime}</label>
          </div>
          <b>Delivery Days: </b>
          <div style={{ padding: 5 }}>
            <label>{supplierDetails.deliveryDays}</label>
          </div>
          <b>Additional Remarks: </b>
          <div style={{ padding: 5, marginLeft: 200, marginRight: 200 }}>
            <label>{supplierDetails.remarks}</label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={editProfile}
            style={{ margin: 10 }}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}
