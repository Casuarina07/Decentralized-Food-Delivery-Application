import React, { useState, useEffect } from "react";
import "./Cust.css";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { Link } from "@reach/router";
import axios from "axios";

export default function Profile({
  account,
  customer,
  custId,
  // custName,
  custAdd,
  custPhone,
  editCustProfile,
  custReports,
}) {
  const [editClicked, setEditClicked] = useState(false);
  const [custPhoneNo, setCustPhoneNo] = useState();
  const [custAddress, setCustAddress] = useState();
  const [custDetails, setCustDetails] = useState([]);
  const [custName, setCustName] = useState();

  useEffect(() => {
    retrieveCustDetails();
  }, []);

  async function retrieveCustDetails() {
    const hi = axios
      .get("https://ipfs.infura.io/ipfs/" + customer.profileHash)
      .then(function (response) {
        console.log("this is the data: ", response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    hi.then((details) => {
      setCustDetails(details);
      setCustPhoneNo(details.phone);
      setCustAddress(details.addressLocation);
      setCustName(details.name);
    });
  }

  function editProfile() {
    setEditClicked(!editClicked);
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
      name: custName,
      addressLocation: custAddress,
      phone: custPhoneNo,
    };
    const jsonObj = JSON.stringify(metaObj);
    const profileHash = await ipfs.add(jsonObj);
    editCustProfile(custId, profileHash.path);
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
            style={{ color: "#FFF", fontSize: 18, textDecoration: "none" }}
            to={`/reports`}
            state={{ reports: custReports }}
          >
            Reports Filed
          </Link>
        </h5>
      </div>
      <BsFillPersonCheckFill size={60} color="#016094" />
      <h3 className="header">{account}</h3>
      <h4 style={{ color: "#016094", marginTop: 30 }}>Profile Details</h4>

      {editClicked ? (
        <div>
          <b>Namee: </b>
          <div style={{ padding: 5 }}>
            <label>{custDetails.name}</label>
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
            <label>{custDetails.name}</label>
          </div>
          <b>Address: </b>
          <div style={{ padding: 5 }}>
            <label>{custDetails.addressLocation}</label>
          </div>
          <b>Phone: </b>
          <div style={{ padding: 5 }}>
            <label>{custDetails.phone}</label>
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
