import React, { useState } from "react";
import { BsFillPersonCheckFill } from "react-icons/bs";

export default function Profile({ account, supplier }) {
  const [editClicked, setEditClicked] = useState(false);
  const [supplierPhoneNo, setSupplierPhoneNo] = useState(supplier.phone);
  // const [custAddress, setCustAddress] = useState(custAdd);

  function editProfile() {
    setEditClicked(!editClicked);
  }

  const saveChanges = (evt) => {
    evt.preventDefault();
    // editCustProfile(custPhoneNo, custAddress);
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
