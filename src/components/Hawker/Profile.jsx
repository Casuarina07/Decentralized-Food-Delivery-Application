import React, { useState } from "react";
import "./Rest.css";
import { FaUserCircle } from "react-icons/fa";
import { BsStarFill, BsStar } from "react-icons/bs";

export default function Profile({
  account,
  hawkerId,
  hawkerName,
  hawkerAdd,
  hawkerOpeningHours,
  hawkerPhone,
  editHawkerProfile,
  hawker,
  hawkerBoolOpen,
  boolOpen,
  hawkerRating,
  hawkerFeedback,
}) {
  const [editClicked, setEditClicked] = useState(false);
  const [hawkerPhoneNo, setHawkerPhoneNo] = useState(hawkerPhone);
  const [hawkerOH, setHawkerOH] = useState(hawkerOpeningHours);
  const [fullStarsCount, setFullStars] = useState(hawkerRating);
  const [emptyStarsCount, setEmptyStars] = useState(5 - fullStarsCount);

  function editProfile() {
    setEditClicked(!editClicked);
  }

  function changeShopStatus() {
    boolOpen(hawkerId);
  }
  const saveChanges = (evt) => {
    evt.preventDefault();
    editHawkerProfile(hawkerId, hawkerPhoneNo, hawkerOH);
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

      <h4 style={{ color: "#016094", marginTop: 30 }}>Hawker Details</h4>
      {editClicked ? (
        <div>
          <b>Name: </b>
          <div style={{ padding: 5 }}>
            <label>{hawkerName}</label>
          </div>

          <b>Address: </b>
          <div style={{ padding: 5 }}>
            <label>{hawkerAdd}</label>
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
            <label>{hawkerName}</label>
          </div>

          <b>Address: </b>
          <div style={{ padding: 5 }}>
            <label>{hawkerAdd}</label>
          </div>

          <b>Phone: </b>
          <div style={{ padding: 5 }}>
            <label>{hawkerPhone}</label>
          </div>

          <b>Opening Hours: </b>
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
