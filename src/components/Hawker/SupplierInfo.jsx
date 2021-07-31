//import { Card } from "@material-ui/core";
import Card from "react-bootstrap/Card";
// import CardBody from "react-bootstrap/CardBody";

import React, { Component, useLocation } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function SupplierInfo(props) {
  const suppliers = props.suppliers;
  const chosenSupplier = props.location.state.chosenSupplierPk;

  console.log("Passed: ", props.hawkerFeedback);
  return (
    <div style={{ marginTop: 20 }}>
      {suppliers.map((supplier, key) => {
        if (supplier.owner === chosenSupplier) {
          return (
            <div>
              <div style={{ flexDirection: "row" }}>
                <h2>{supplier.name}</h2>
                <h3>Rating: {supplier.avgRating}/5</h3>
              </div>
              <div style={{ marginTop: 30 }}>
                <b>Public Key: </b>
                <div style={{ marginBottom: 20 }}>
                  <h5 style={{ color: "#016094" }}>{supplier.owner}</h5>
                </div>

                <b>Company Address: </b>
                <div style={{ marginBottom: 20 }}>
                  <h5 style={{ color: "#016094" }}>
                    {supplier.addressLocation}
                  </h5>
                </div>

                <b>Contact: </b>
                <div style={{ marginBottom: 20 }}>
                  <h5 style={{ color: "#016094" }}>{supplier.phone}</h5>
                </div>

                <b>MOQ: </b>
                <div style={{ marginBottom: 20 }}>
                  <h5 style={{ color: "#016094" }}>
                    ${supplier.MOQ} - 0.024 Eth
                  </h5>
                </div>

                <b>Lead Time: </b>
                <div style={{ marginBottom: 20 }}>
                  <h5 style={{ color: "#016094" }}>{supplier.leadTime}</h5>
                </div>

                <b>Delivery Days: </b>
                <div style={{ marginBottom: 20 }}>
                  <h5 style={{ color: "#016094" }}>{supplier.deliveryDays}</h5>
                </div>

                <b>Additional Remarks: </b>
                <div
                  style={{
                    marginBottom: 20,
                    paddingRight: 100,
                    paddingLeft: 100,
                  }}
                >
                  <h5 style={{ color: "#016094" }}>{supplier.remarks}</h5>
                </div>
              </div>
            </div>
          );
        }
      })}
      {/* {props.hawkerFeedback.map((feedback, key) => {
        if (feedback.seller.toString() == chosenHawker.toString()) {
          console.log("Same seller account: ", feedback.seller);
          console.log("entered");
          return (
            <div>
              <b>Customer: </b>
              <div style={{ marginBottom: 20 }}>
                <h5 style={{ color: "#016094" }}>{feedback.customer}</h5>
              </div>
              <b>Rating: </b>
              <div style={{ marginBottom: 20 }}>
                <h5 style={{ color: "#016094" }}>{feedback.rate}/5</h5>
              </div>
              <b>Comments: </b>
              <div style={{ marginBottom: 20 }}>
                <h5 style={{ color: "#016094" }}>{feedback.comment}</h5>
              </div>
              <hr style={{ width: "60%", display: "flex" }} />
            </div>
          );
        } */}
      {/* {hawker.open ? (
                <label
                  style={{
                    background: "#eba834",
                    padding: 5,
                  }}
                >
                  Shop Open
                </label>
              ) : (
                <label>Shop Close</label>
              )} */}
      {/* })} */}
    </div>
  );
  //return <h1>Hello</h1>;
}
