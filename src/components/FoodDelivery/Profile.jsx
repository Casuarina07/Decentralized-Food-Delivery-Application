import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

export default function Profile({
  account,
  fdDelivery,
  boolWork,
  fdAcceptedOrders,
}) {
  const [completedCount, setCompletedCount] = useState(0);
  const [riderDetails, setRiderDetails] = useState([]);
  useEffect(() => {
    retrieveFdDetails();
  }, []);
  async function retrieveFdDetails() {
    const hi = axios
      .get("https://ipfs.infura.io/ipfs/" + fdDelivery.profileHash)
      .then(function (response) {
        console.log("this is the data: ", response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    hi.then((details) => {
      setRiderDetails(details);
    });
  }
  function changeAvailability() {
    for (var i = 0; i < fdAcceptedOrders.length; i++) {
      console.log("what is this: ", fdAcceptedOrders[i].state);
      if (fdAcceptedOrders[i].state < 4) {
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
          <label>{riderDetails.name}</label>
        </div>

        <b>Phone: </b>
        <div style={{ padding: 5 }}>
          <label>{riderDetails.phone}</label>
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
