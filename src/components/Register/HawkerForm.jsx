import React, { useState } from "react";

export default function HawkerForm({ addHawker }) {
  const [fileUpload, setFileUpload] = useState(false);
  const [buffer, setBuffer] = useState(null);
  const [publicKey, setPublicKey] = useState("");
  const [hawkerName, setHawkerName] = useState("");
  const [hawkerAddress, setHawkerAddress] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [licenseHash, setLicenseHash] = useState("");

  const register = (event) => {
    if (fileUpload == false) {
      alert("Please add a SFA/NEA Licence file for verification");
    } else {
      console.log(licenseHash);
      addHawker(
        publicKey,
        hawkerName,
        hawkerAddress,
        emailAddress,
        phoneNo,
        openingHours,
        licenseHash
      );
    }
  };
  const captureFile = async (event) => {
    const { create } = require("ipfs-http-client");
    const ipfs = create({
      host: "ipfs.infura.io",
      port: "5001",
      protocol: "https",
    });
    setFileUpload(true);
    event.preventDefault();
    console.log("file captured...");
    //Process file for IPFS - convert to buffer
    const file = event.target.files[0];
    const hash = await ipfs.add(file, {
      progress: (prog) => console.log(`received: ${prog}`),
    });
    setLicenseHash(hash.path);
  };
  return (
    <div>
      <div className="form-group">
        <label>Public Key</label>
        <input
          type="text"
          className="form-control"
          placeholder="Public Key"
          onChange={(e) => {
            setPublicKey(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Hawker Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter hawker name"
          onChange={(e) => {
            setHawkerName(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Hawker address</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter hawker address"
          onChange={(e) => {
            setHawkerAddress(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email address"
          onChange={(e) => {
            setEmailAddress(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter phone number"
          onChange={(e) => {
            setPhoneNo(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Opening Hours</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter opening hours"
          onChange={(e) => {
            setOpeningHours(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>SFA/NEA Licence ( .pdf, .doc or .jpeg format ) </label>
        <input
          className="form-group mr-sm-1"
          type="file"
          accept=".pdf,.doc,.jpeg"
          onChange={captureFile}
        />
      </div>

      <button
        // type="submit"
        type="button"
        className="btn btn-primary btn-block"
        onClick={register}
      >
        Register
      </button>
    </div>
  );
}
