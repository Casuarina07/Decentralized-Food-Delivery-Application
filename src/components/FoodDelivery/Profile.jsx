import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Profile({
  account,
  fdDelivery,
  boolWork,
  fdAcceptedOrders,
}) {
  const [completedCount, setCompletedCount] = useState(0);
  function changeAvailability() {
    for (var i = 0; i < fdAcceptedOrders.length; i++) {
      console.log("what is this: ", fdAcceptedOrders[i].state);
      if (fdAcceptedOrders[i].state < 3) {
        alert("You still have ongoing orders. Please complete before stopping");
        return;
      }

      // if (fdAcceptedOrders[i].state == 3) {
      //   const count = completedCount;
      //   setCompletedCount(count + 1);
      // }
    }
    boolWork(fdDelivery.id);
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
            End
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
