//import { Card } from "@material-ui/core";
import Card from "react-bootstrap/Card";
// import CardBody from "react-bootstrap/CardBody";
import axios from "axios";

import React, { Component, useEffect, useState } from "react";
import { BsStarFill, BsStar } from "react-icons/bs";

export default function SupplierInfo(props) {
  const suppliers = props.suppliers;
  const supplier = props.location.state.chosenSupplier;
  const [supplierDetails, setSupplierDetails] = useState([]);
  const [fullStarsCount, setFullStars] = useState(supplier.avgRating);
  const [emptyStarsCount, setEmptyStars] = useState(5 - fullStarsCount);
  var stars = [];
  for (var i = 1; i <= fullStarsCount; i++) {
    stars.push(
      <BsStarFill
        color="#eba834"
        size="20"
        style={{ marginRight: 5, marginBottom: 5 }}
      />
    );
  }
  for (var i = 1; i <= emptyStarsCount; i++) {
    stars.push(
      <BsStar
        color="#eba834"
        size="20"
        style={{ marginRight: 5, marginBottom: 5 }}
      />
    );
  }
  console.log("Passed: ", props.hawkerFeedback);

  useEffect(() => {
    getSupplierDetails();
  }, []);

  async function getSupplierDetails() {
    const supplierDetails = axios
      .get("https://ipfs.infura.io/ipfs/" + supplier.profileHash)
      .then(function (response) {
        console.log("this is the data: ", response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    supplierDetails.then((details) => {
      setSupplierDetails(details);
    });
  }
  return (
    <div style={{ marginTop: 20 }}>
      <div>
        <div style={{ flexDirection: "row" }}>
          <h2>{supplierDetails.name}</h2>
        </div>
        {stars}
        <h5 style={{ color: "#838383" }}>
          AVERAGE RATING OF: {supplier.feedbackCount} CUSTOMER(S)
        </h5>
        <div style={{ marginTop: 30 }}>
          <b>Public Key: </b>
          <div style={{ marginBottom: 20 }}>
            <h5 style={{ color: "#016094" }}>{supplier.owner}</h5>
          </div>

          <b>Company Address: </b>
          <div style={{ marginBottom: 20 }}>
            <h5 style={{ color: "#016094" }}>
              {supplierDetails.addressLocation}
            </h5>
          </div>

          <b>Contact: </b>
          <div style={{ marginBottom: 20 }}>
            <h5 style={{ color: "#016094" }}>{supplierDetails.phone}</h5>
          </div>

          <b>MOQ: </b>
          <div style={{ marginBottom: 20 }}>
            <h5 style={{ color: "#016094" }}>${supplierDetails.MOQ}</h5>
          </div>

          <b>Lead Time: </b>
          <div style={{ marginBottom: 20 }}>
            <h5 style={{ color: "#016094" }}>{supplierDetails.leadTime}</h5>
          </div>

          <b>Delivery Days: </b>
          <div style={{ marginBottom: 20 }}>
            <h5 style={{ color: "#016094" }}>{supplierDetails.deliveryDays}</h5>
          </div>

          <b>Additional Remarks: </b>
          <div
            style={{
              marginBottom: 20,
              paddingRight: 100,
              paddingLeft: 100,
            }}
          >
            <h5 style={{ color: "#016094", marginBottom: 50 }}>
              {supplierDetails.remarks}
            </h5>
          </div>
        </div>
      </div>

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
