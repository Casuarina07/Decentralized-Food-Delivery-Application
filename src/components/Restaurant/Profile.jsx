import React, { useState } from "react";
import "./Rest.css";
import { FaUserCircle } from "react-icons/fa";

export default function Profile({
  account,
  hawkerName,
  hawkerAdd,
  hawkerOpeningHours,
  hawkerPhone,
}) {
  const [editClicked, setEditClicked] = useState(false);
  function editProfile() {
    console.log("Button Clicked");
    setEditClicked(true);
  }
  return (
    <div style={{ marginTop: 30 }}>
      <FaUserCircle size={60} color="#016094" />
      <h3 className="header">{account}</h3>

      {editClicked ? (
        <div>
          <button>Save Profile</button>
        </div>
      ) : (
        <div>
          <b>Hawker Name: </b>
          <div style={{ padding: 5 }}>
            <label>{hawkerName}</label>
          </div>
          <b>Hawker Address: </b>
          <div style={{ padding: 5 }}>
            <label>{hawkerAdd}</label>
          </div>

          <b>Hawker Phone: </b>
          <div style={{ padding: 5 }}>
            <label>{hawkerPhone}</label>
          </div>

          <b>Hawker Opening Hours: </b>
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

          <button
            type="submit"
            className="btn"
            style={{ margin: 10, background: "red", color: "white" }}
          >
            Close Shop
          </button>
        </div>
      )}
    </div>
  );
}
