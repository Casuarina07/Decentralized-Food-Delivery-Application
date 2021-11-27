//import { Card } from "@material-ui/core";
import Card from "react-bootstrap/Card";
// import CardBody from "react-bootstrap/CardBody";
import axios from "axios";

import React, { Component, useEffect, useState } from "react";
import { BsStarFill, BsStar } from "react-icons/bs";

export default function HawkerInfo(props) {
  // const hawkers = props.hawkers;
  const hawker = props.location.state.chosenHawkerPk;
  const [hawkerDetails, setHawkerDetails] = useState([]);
  const [fullStarsCount, setFullStars] = useState(hawker.avgRating);
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
    getHawkerDetails();
  }, []);

  async function getHawkerDetails() {
    const hawkerDetails = axios
      .get("https://ipfs.infura.io/ipfs/" + hawker.profileHash)
      .then(function (response) {
        console.log("this is the data: ", response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    hawkerDetails.then((details) => {
      setHawkerDetails(details);
    });
  }
  return (
    <div style={{ marginTop: 20 }}>
      <div>
        <div style={{ flexDirection: "row" }}>
          <h2>{hawkerDetails.name}</h2>
        </div>
        {stars}
        <h5 style={{ color: "#838383" }}>
          AVERAGE RATING OF: {hawker.feedbackCount} CUSTOMER(S)
        </h5>
        <div style={{ marginTop: 30 }}>
          <b>Public Key: </b>
          <div style={{ marginBottom: 20 }}>
            <h5 style={{ color: "#016094" }}>{hawker.owner}</h5>
          </div>

          <b>Address: </b>
          <div style={{ marginBottom: 20 }}>
            <h5 style={{ color: "#016094" }}>
              {hawkerDetails.addressLocation}
            </h5>
          </div>

          <b>Opening Hours: </b>
          <div style={{ marginBottom: 20 }}>
            <h5 style={{ color: "#016094" }}>{hawkerDetails.openingHours}</h5>
          </div>

          <b>Contact: </b>
          <div style={{ marginBottom: 20 }}>
            <h5 style={{ color: "#016094" }}>{hawkerDetails.phone}</h5>
          </div>
        </div>
        <hr style={{ width: "60%", display: "flex" }} />
      </div>
      {props.hawkerFeedback.map((feedback, key) => {
        if (feedback.seller.toString() == hawker.owner.toString()) {
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
        }
        {
          /* {hawker.open ? (
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
              )} */
        }
      })}
    </div>
  );
}
