import React, { useState } from "react";
import { BsFillPersonCheckFill } from "react-icons/bs";

export default function Profile({ account, supplier, editSupplierProfile }) {
  const [editClicked, setEditClicked] = useState(false);
  const [supplierPhoneNo, setSupplierPhoneNo] = useState(supplier.phone);
  const [supplierMoq, setSupplierMoq] = useState(supplier.MOQ);
  const [supplierLeadTime, setSupplierLeadTime] = useState(supplier.leadTime);
  const [deliveryDays, setDeliveryDays] = useState(supplier.deliveryDays);
  const [fromDeliveryDay, setFromDeliveryDay] = useState("Monday");
  const [toDeliveryDay, setToDeliveryDay] = useState("Sunday");
  const [supplierRemarks, setSupplierRemarks] = useState(supplier.remarks);

  // const [custAddress, setCustAddress] = useState(custAdd);

  function editProfile() {
    setEditClicked(!editClicked);
  }

  const saveChanges = (evt) => {
    evt.preventDefault();
    var deliveryDays = fromDeliveryDay + "-" + toDeliveryDay;
    setDeliveryDays(deliveryDays);
    editSupplierProfile(
      supplierPhoneNo,
      supplierMoq,
      supplierLeadTime,
      deliveryDays,
      supplierRemarks
    );
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
            <label>{supplier.name}</label>
          </div>

          <b>Address: </b>
          <div>
            <label>{supplier.addressLocation}</label>
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

            <b>MOQ: </b>
            <div style={{ padding: 5 }}>
              <input
                type="text"
                value={supplierMoq}
                onChange={(e) => setSupplierMoq(e.target.value)}
              />
            </div>

            <b>Lead Time: </b>
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
            <label>{supplier.name}</label>
          </div>
          <b>Email: </b>
          <div style={{ padding: 5 }}>
            <label>{supplier.email}</label>
          </div>
          <b>Address: </b>
          <div style={{ padding: 5 }}>
            <label>{supplier.addressLocation}</label>
          </div>
          <b>Phone: </b>
          <div style={{ padding: 5 }}>
            <label>{supplier.phone}</label>
          </div>
          <b>MOQ: </b>
          <div style={{ padding: 5 }}>
            <label>{supplier.MOQ}</label>
          </div>
          <b>Lead Time: </b>
          <div style={{ padding: 5 }}>
            <label>{supplier.leadTime}</label>
          </div>
          <b>Delivery Days: </b>
          <div style={{ padding: 5 }}>
            <label>{supplier.deliveryDays}</label>
          </div>
          <b>Additional Remarks: </b>
          <div style={{ padding: 5, marginLeft: 200, marginRight: 200 }}>
            <label>{supplier.remarks}</label>
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
