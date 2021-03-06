import React, { useState } from "react";
import "./Cust.css";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { Button } from "react-bootstrap";
import { Link } from "@reach/router";
import Image from "react-bootstrap/Image";

export default function ReportDetails(props) {
  const report = props.location.state.report;
  const issueType = report.title;
  let titleDisplay = "";
  console.log("Issue Type: ", issueType);
  if (issueType == "missingItem") {
    titleDisplay = "Missing Item";
  } else if (issueType == "incorrectOrder") {
    titleDisplay = "Incorrect order";
  } else if (issueType == "undelivered") {
    titleDisplay = "Undelivered order";
  } else {
    titleDisplay = "Safety issues";
  }
  //date
  let reportDate = new Date(report.reportDate * 1000);
  let endDate = new Date(report.deadlineDate * 1000);
  let complete = false;
  let claimAmt = 0;
  let hawkerAddress = "";

  let newDate =
    reportDate.getDate() +
    "/" +
    reportDate.getMonth() +
    "/" +
    reportDate.getFullYear();

  if (new Date() > endDate) {
    complete = true;
  }
  //image hash
  console.log("Image Hash: ", report.imageHash);
  console.log("Report Details: ", report);
  console.log("Customer Order Items: ", props.custOrderItems);
  console.log("Hawker Order Items: ", props.hawkerOrderItems);
  return (
    <div
      style={{
        margin: 60,
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        // // float: "left",
        // alignItems: "flex-start",
        alignItems: "center",
      }}
    >
      <h4
        style={{
          color: "#DC0126",
          fontWeight: "bold",
          textDecorationLine: "underline",
        }}
      >
        Reported for {titleDisplay}
      </h4>

      {complete ? (
        <>
          <label style={{ color: "red", marginBottom: 10 }}>
            Status: Completed
          </label>
          {report.approvalCount > report.rejectionCount ? (
            <>
              <label style={{ color: "green", marginBottom: 10 }}>
                Outcome: Successful
              </label>
              {report.resolved ? (
                <label
                  style={{
                    color: "green",
                    marginBottom: 10,
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  ***{" "}
                  {window.web3.utils.fromWei(
                    report.claimAmt.toString(),
                    "Ether"
                  )}{" "}
                  Eth have been credited to your account ***
                </label>
              ) : null}
            </>
          ) : (
            <label style={{ color: "red", marginBottom: 10 }}>
              Outcome: Unsuccessful
            </label>
          )}
        </>
      ) : (
        <label style={{ color: "green", marginBottom: 10 }}>
          Status: Pending
        </label>
      )}
      <h5>Report filed on:</h5>
      <div style={{ marginBottom: 20 }}>
        {reportDate.toLocaleDateString("en-GB")},{" "}
        {reportDate.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
        by <div style={{ color: "#808080" }}>{report.owner}</div>
      </div>
      <h5>Voting ends on:</h5>
      <div style={{ marginBottom: 20 }}>
        {endDate.toLocaleDateString("en-GB")},{" "}
        {endDate.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>

      <div style={{ marginBottom: 20 }}>
        <label
          style={{
            fontSize: 70,
            color: "green",
            fontWeight: "bold",
            marginRight: 50,
          }}
        >
          {report.approvalCount}
        </label>
        <label style={{ fontSize: 70, color: "red", fontWeight: "bold" }}>
          {report.rejectionCount}
        </label>

        <div>
          {" "}
          <label
            style={{
              fontSize: 20,
              color: "green",
              fontWeight: "bold",
              marginRight: 50,
            }}
          >
            APPROVAL
          </label>
          <label style={{ fontSize: 20, color: "red", fontWeight: "bold" }}>
            REJECTION
          </label>
        </div>
      </div>

      {/* missing items */}
      {report.title == "missingItem" ? <h5>Missing Item(s): </h5> : null}
      {report.title == "missingItem"
        ? report.missingItems.map((item, key) => {
            return <div style={{ marginBottom: 20 }}>- {item}</div>;
          })
        : null}

      <h5>Supporting Image(s): </h5>
      {report.imageHash.length == 0 ? (
        <div style={{ marginBottom: 20 }}>No supporting images</div>
      ) : null}
      {report.imageHash.map((image, key) => {
        return (
          <Image
            style={{ width: 300, height: 300, marginBottom: 20 }}
            src={"https://ipfs.infura.io/ipfs/" + image}
          />
        );
      })}
      <h5>Remarks: </h5>
      <div style={{ marginBottom: 20 }}>{report.remarks}</div>

      <h4 style={{ color: "#226BBF", marginBottom: 20 }}>Order Details</h4>
      {/* Order details */}
      {props.orders.map((order, key) => {
        let hawkerReport = [];
        if (order.id == report.orderId) {
          claimAmt = order.hawkerPayment;
          hawkerAddress = order.seller;
          return (
            <div>
              <h5>Ordered on: </h5>
              <div style={{ marginBottom: 20 }}> {order.dateTime} </div>
              <h5>Ordered from: </h5>
              {props.hawkers.map((hawker, key) => {
                if (hawker.owner == order.seller) {
                  hawkerReport = hawker;
                }
              })}
              <div style={{ marginBottom: 20 }}>
                <Link
                  to={`/hawkerInfo/${order.seller}`}
                  state={{ chosenHawkerPk: hawkerReport }}
                  // state={{ chosenHawkerPk: hawker }}
                >
                  {order.seller}
                </Link>
              </div>
              <h5>Delivered by: </h5>
              <div style={{ marginBottom: 20 }}> {order.rider} </div>
              <h5>Delivered at: </h5>
              <div style={{ marginBottom: 20 }}> {order.deliveryDateTime} </div>
              <h5>Item(s) Ordered: </h5>
              {props.ordersItems.map((item, key) => {
                if (item.orderId == report.orderId) {
                  return (
                    <div>
                      - {props.restProducts[item.productId - 1].name} - Qty:{" "}
                      {item.productQty}
                    </div>
                  );
                }
              })}
              <h5 style={{ marginTop: 20 }}>Total item ordered: </h5>
              <div style={{ marginBottom: 20 }}>{order.purchasedItemCount}</div>
              <h5>Total Order Cost: </h5>
              <div style={{ marginBottom: 20 }}>
                {window.web3.utils.fromWei(
                  order.totalPrice.toString(),
                  "Ether"
                )}{" "}
                Eth
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
