import React from "react";

export default function SupplierForm() {
  return (
    <div>
      <div className="form-group">
        <label>Public Key</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Public Key "
        />
      </div>

      <div className="form-group">
        <label>Name</label>
        <input type="text" className="form-control" placeholder="Enter name" />
      </div>

      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
        />
      </div>

      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter company address"
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter phone number"
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Register
      </button>
    </div>
  );
}
