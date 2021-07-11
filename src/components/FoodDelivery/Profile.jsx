import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Profile({ account, fdDelivery, boolWork }) {
  const [editClicked, setEditClicked] = useState(false);

  function changeAvailability() {
    boolWork();
  }

  return (
    <div style={{ marginTop: 20, marginBottom: 30 }}>
      <FaUserCircle size={60} color="#016094" />
      <h3 className="header">{account}</h3>
      <h4 style={{ color: "#016094", marginTop: 30 }}>
        Food Delivery Profile Details
      </h4>
      <div>
        <b>Name: </b>
        <div style={{ padding: 5 }}>
          <label>{fdDelivery.name}</label>
        </div>

        <b>Phone: </b>
        <div style={{ padding: 5 }}>
          <label>{fdDelivery.phone}</label>
        </div>

        <b>Deliveries Completed: </b>
        <div style={{ padding: 5 }}>
          <label>{fdDelivery.ordersAcceptedCount}</label>
        </div>

        {fdDelivery.available ? (
          <button
            type="submit"
            className="btn"
            onClick={changeAvailability}
            style={{ margin: 10, background: "red", color: "white" }}
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            className="btn"
            onClick={changeAvailability}
            style={{ margin: 10, background: "#eba834", color: "white" }}
          >
            Start
          </button>
        )}
      </div>
    </div>
  );
}
