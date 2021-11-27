import React, { useState, useEffect } from "react";
import "./Rest.css";
import { FaUserCircle } from "react-icons/fa";
import { BsStarFill, BsStar } from "react-icons/bs";
import axios from "axios";

export default function Profile({
  account,
  hawkerId,
  editHawkerProfile,
  hawker,
  hawkerBoolOpen,
  boolOpen,
  hawkerRating,
  hawkerFeedback,
  hawkerOrderCount,
  hawkerCancellationCount,
}) {
  useEffect(() => {
    retrieveHawkerDetails();
  }, []);

  const [editClicked, setEditClicked] = useState(false);
  const [hawkerName, setHawkerName] = useState();
  const [hawkerPhoneNo, setHawkerPhoneNo] = useState();
  const [hawkerAddress, setHawkerAddress] = useState();
  const [hawkerLicenseHash, setHawkerLicenseHash] = useState();
  const [hawkerOH, setHawkerOH] = useState();
  const [hawkerLeadTime, setHawkerLeadTime] = useState();
  const [fullStarsCount, setFullStars] = useState(hawkerRating);
  const [emptyStarsCount, setEmptyStars] = useState(5 - fullStarsCount);
  const [hawkerDetails, setHawkerDetails] = useState([]);

  async function retrieveHawkerDetails() {
    const hi = axios
      .get("https://ipfs.infura.io/ipfs/" + hawker.profileHash)
      .then(function (response) {
        console.log("this is the data: ", response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    hi.then((details) => {
      setHawkerDetails(details);
      setHawkerName(hawkerDetails.name);
      setHawkerAddress(hawkerDetails.addressLocation);
      setHawkerPhoneNo(hawkerDetails.phone);
      setHawkerLicenseHash(hawkerDetails.licenseHash);
      setHawkerOH(hawkerDetails.openingHours);
      setHawkerLeadTime(hawkerDetails.leadTime);
      console.log("Result: ", hawkerDetails);
    });
  }

  function editProfile() {
    setEditClicked(!editClicked);
  }

  function changeShopStatus() {
    boolOpen(hawkerId);
  }
  const saveChanges = async (evt) => {
    evt.preventDefault();
    const { create } = require("ipfs-http-client");
    const ipfs = create({
      host: "ipfs.infura.io",
      port: "5001",
      protocol: "https",
    });
    const metaObj = {
      name: hawkerName,
      addressLocation: hawkerAddress,
      phone: hawkerPhoneNo,
      openingHours: hawkerOH,
      leadTime: hawkerLeadTime,
      licenseHash: hawkerLicenseHash,
    };
    const jsonObj = JSON.stringify(metaObj);
    const profileHash = await ipfs.add(jsonObj);
    console.log("JSON hash: ", profileHash.path);
    editHawkerProfile(hawkerId, profileHash.path);
  };
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

  return (
    <div style={{ marginTop: 20, marginBottom: 30 }}>
      <FaUserCircle size={60} color="#016094" />
      <h3 className="header">{account}</h3>
      {stars}
      <h5>AVERAGE RATING OF: {hawker.feedbackCount} CUSTOMER(S)</h5>
      <h5 style={{ color: "red" }}>
        CANCELLATION RATE: {(hawkerCancellationCount / hawkerOrderCount) * 100}{" "}
        %
      </h5>

      <h4 style={{ color: "#016094", marginTop: 30 }}>Hawker Details</h4>
      {editClicked ? (
        <div>
          <b>Name: </b>
          <div style={{ padding: 5 }}>
            <label>{hawkerDetails.name}</label>
          </div>

          <b>Address: </b>
          <div style={{ padding: 5 }}>
            <label>{hawkerDetails.addressLocation}</label>
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

            <b>Lead Time: (mins) </b>
            <div>
              <input
                style={{ width: 500, marginTop: 7 }}
                type="number"
                min="1"
                max="40"
                value={hawkerLeadTime}
                onChange={(e) => setHawkerLeadTime(e.target.value)}
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
            <label>{hawkerDetails.name}</label>
          </div>

          <b>Address: </b>
          <div style={{ padding: 5 }}>
            <label>{hawkerDetails.addressLocation}</label>
          </div>

          <b>Phone: </b>
          <div style={{ padding: 5 }}>
            <label>{hawkerDetails.phone}</label>
          </div>

          <b>Opening Hours: </b>
          <div>
            <label>{hawkerDetails.openingHours}</label>
          </div>

          <b>Lead Time: </b>
          <div>
            <label>{hawkerDetails.leadTime} mins</label>
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
      {hawkerFeedback.length > 0 ? (
        <h3 style={{ marginTop: 20 }}>Feedbacks</h3>
      ) : null}
      {hawkerFeedback.map((feedback, key) => {
        if (feedback.seller.toString() == account.toString()) {
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
      })}
    </div>
  );
}
