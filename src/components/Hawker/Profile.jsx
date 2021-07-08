import React, { useState, useEffect } from "react";
import "./Rest.css";
import { FaUserCircle } from "react-icons/fa";

export default function Profile({
  account,
  hawkerName,
  hawkerAdd,
  hawkerOpeningHours,
  hawkerPhone,
  editHawkerProfile,
  hawkers,
  hawkerBoolOpen,
  boolOpen,
}) {
  const [editClicked, setEditClicked] = useState(false);
  const [hawkerPhoneNo, setHawkerPhoneNo] = useState(hawkerPhone);
  const [hawkerOH, setHawkerOH] = useState(hawkerOpeningHours);
  function editProfile() {
    setEditClicked(!editClicked);
  }

  function changeShopStatus() {
    boolOpen();
  }
  const saveChanges = (evt) => {
    evt.preventDefault();
    editHawkerProfile(hawkerPhoneNo, hawkerOH);
  };
  return (
    <div style={{ marginTop: 20, marginBottom: 30 }}>
      <FaUserCircle size={60} color="#016094" />
      <h3 className="header">{account}</h3>
      <h4 style={{ color: "#016094", marginTop: 30 }}>Hawker Details</h4>

      {editClicked ? (
        <div>
          <b>Name: </b>
          <div style={{ padding: 5 }}>
            <label>{hawkerName}</label>
          </div>

          <b>Address: </b>
          <div style={{ padding: 5 }}>
            <label>{hawkerAdd}</label>
          </div>

          <form onSubmit={saveChanges}>
            <b>Phone: </b>
            <div style={{ padding: 5 }}>
              <input
                type="text"
                value={hawkerPhoneNo}
                onChange={(e) => setHawkerPhoneNo(e.target.value)}
              />
            </div>

            <b>Opening Hours: </b>
            <div>
              <input
                style={{ width: 500, marginTop: 7 }}
                type="text"
                value={hawkerOH}
                onChange={(e) => setHawkerOH(e.target.value)}
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
            <label>{hawkerName}</label>
          </div>

          <b>Address: </b>
          <div style={{ padding: 5 }}>
            <label>{hawkerAdd}</label>
          </div>

          <b>Phone: </b>
          <div style={{ padding: 5 }}>
            <label>{hawkerPhone}</label>
          </div>

          <b>Opening Hours: </b>
          <div>
            <label>{hawkerOpeningHours}</label>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={editProfile}
            style={{ margin: 10 }}
          >
            Edit Profile
          </button>

          {hawkerBoolOpen ? (
            <button
              type="submit"
              className="btn"
              onClick={changeShopStatus}
              style={{ margin: 10, background: "red", color: "white" }}
            >
              Close Shop
            </button>
          ) : (
            <button
              type="submit"
              className="btn"
              onClick={changeShopStatus}
              style={{ margin: 10, background: "#eba834", color: "white" }}
            >
              Open Shop
            </button>
          )}
        </div>
      )}
    </div>
  );
}
