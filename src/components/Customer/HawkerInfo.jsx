//import { Card } from "@material-ui/core";
import Card from "react-bootstrap/Card";
// import CardBody from "react-bootstrap/CardBody";

import React, { Component, useLocation } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function HawkerInfo(props) {
  const hawkers = props.hawkers;
  const chosenHawker = props.location.state.chosenHawkerPk;

  console.log("Passed: ", props.hawkerFeedback);
  return (
    <div style={{ marginTop: 20 }}>
      {hawkers.map((hawker, key) => {
        if (hawker.owner === chosenHawker) {
          return (
            <div>
              <div style={{ flexDirection: "row" }}>
                <h2>{hawker.name}</h2>
                <h3>Rating: {hawker.avgRating}/5</h3>
              </div>
              <div style={{ marginTop: 30 }}>
                <b>Public Key: </b>
                <div style={{ marginBottom: 20 }}>
                  <h5 style={{ color: "#016094" }}>{hawker.owner}</h5>
                </div>

                <b>Address: </b>
                <div style={{ marginBottom: 20 }}>
                  <h5 style={{ color: "#016094" }}>{hawker.addressLocation}</h5>
                </div>

                <b>Opening Hours: </b>
                <div style={{ marginBottom: 20 }}>
                  <h5 style={{ color: "#016094" }}>{hawker.openingHours}</h5>
                </div>

                <b>Contact: </b>
                <div style={{ marginBottom: 20 }}>
                  <h5 style={{ color: "#016094" }}>{hawker.phone}</h5>
                </div>
              </div>
            </div>
          );
        }
      })}

      {props.hawkerFeedback.map((feedback, key) => {
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
  //return <h1>Hello</h1>;
}
