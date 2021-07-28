import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import CustForm from "./CustForm";
import HawkerForm from "./HawkerForm";
import SupplierForm from "./SupplierForm";
import FdForm from "./FdForm";

export default function Register({ addHawker, addCustomer }) {
  const [accType, setAccType] = useState("customer");
  const handleChange = (event) => {
    setAccType(event.target.value);
  };

  return (
    <div style={{ marginTop: 60, marginBottom: 60 }}>
      <form
        style={{
          width: 450,
          margin: "auto",
          background: "#f5f5f5",
          padding: 40,
        }}
      >
        <h3>Register</h3>

        <FormControl component="fieldset" style={{ marginTop: 10 }}>
          <FormLabel component="legend">Account Type </FormLabel>
          <RadioGroup
            aria-label="account"
            name="account1"
            value={accType}
            onChange={handleChange}
          >
            <FormControlLabel
              value="customer"
              control={<Radio />}
              label="Customer"
            />
            <FormControlLabel
              value="hawker"
              control={<Radio />}
              label="Hawker"
            />
            <FormControlLabel
              value="supplier"
              control={<Radio />}
              label="Supplier"
            />
            <FormControlLabel
              value="foodDelivery"
              control={<Radio />}
              label="Food Delivery Rider"
            />
          </RadioGroup>
        </FormControl>
        {accType == "customer" ? <CustForm addCustomer={addCustomer} /> : null}
        {accType == "hawker" ? <HawkerForm addHawker={addHawker} /> : null}
        {accType == "supplier" ? <SupplierForm /> : null}
        {accType == "foodDelivery" ? <FdForm /> : null}
      </form>
    </div>
  );
}
