import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function Loading() {
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
        </FormControl>
      </form>
    </div>
  );
}
