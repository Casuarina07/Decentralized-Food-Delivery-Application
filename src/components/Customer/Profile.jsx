import React, { useState } from "react";
import "./Cust.css";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { Link } from "@reach/router";

export default function Profile({
  account,
  custId,
  custName,
  custAdd,
  custPhone,
  editCustProfile,
  custReports,
}) {
  const [editClicked, setEditClicked] = useState(false);
  const [custPhoneNo, setCustPhoneNo] = useState(custPhone);
  const [custAddress, setCustAddress] = useState(custAdd);

  function editProfile() {
    setEditClicked(!editClicked);
  }

  const saveChanges = (evt) => {
    evt.preventDefault();
    editCustProfile(custId, custPhoneNo, custAddress);
  };

  return (
    <div style={{ marginTop: 20, marginBottom: 30 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: 20,
          flexDirection: "row",
        }}
      >
        {/* <Button variant="warning">Reports Issued</Button> */}
        <h5
          style={{
            backgroundColor: "#5F5858",
            padding: 10,
            borderRadius: 4,
          }}
        >
          <Link
            style={{ color: "#FFF", fontSize: 18 }}
            to={`/reports`}
            state={{ reports: custReports }}
          >
            Reports Issued
          </Link>
        </h5>
      </div>
      <BsFillPersonCheckFill size={60} color="#016094" />
      <h3 className="header">{account}</h3>
      <h4 style={{ color: "#016094", marginTop: 30 }}>Profile Details</h4>

      {editClicked ? (
        <div>
          <b>Name: </b>
          <div style={{ padding: 5 }}>
            <label>{custName}</label>
          </div>

          <form onSubmit={saveChanges}>
            <b>Phone: </b>
            <div style={{ padding: 5 }}>
              <input
                type="text"
                value={custPhoneNo}
                onChange={(e) => setCustPhoneNo(e.target.value)}
              />
            </div>

            <b>Address: </b>
            <div>
              <input
                style={{ width: 500, marginTop: 7 }}
                type="text"
                value={custAddress}
                onChange={(e) => setCustAddress(e.target.value)}
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
            <label>{custName}</label>
          </div>
          <b>Address: </b>
          <div style={{ padding: 5 }}>
            <label>{custAdd}</label>
          </div>
          <b>Phone: </b>
          <div style={{ padding: 5 }}>
            <label>{custPhone}</label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={editProfile}
            style={{ margin: 10 }}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}
