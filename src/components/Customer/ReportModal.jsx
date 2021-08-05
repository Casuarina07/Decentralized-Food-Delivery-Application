import React, { Component } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormGroup from "@material-ui/core/FormGroup";

import { getEstDeliveryTime, getHawkerFdTime } from "../utils/utils-time";
import { Checkbox } from "@material-ui/core";

export class ReportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueType: "",
      remarks: "",
      //   missingItems: { ProductA: true, ProductB: false },
      productA: true,
    };
  }

  report = (event) => {
    console.log("report button clicked");
    // this.props.fdAcceptOrder(this.props.orderId);
    // console.log(productA.value);
  };

  handleChange = (event) => {
    this.setState({ issueType: event.target.value });
  };

  //   checkedBoxChanged = (event) => {
  //     this.setState({
  //       missingItems: {
  //         ...this.state.missingItems,
  //         [event.target.name]: event.target.checked,
  //       },
  //     });
  //   };

  change = (event) => {
    console.log("idk", event.target.value);
  };

  render() {
    console.log("Order: ", this.props.order);
    console.log("All Customer Orders: ", this.props.orders);
    console.log("All Customer Order Items: ", this.props.orderItems);
    return (
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={this.props.onHide}>
          <Modal.Title id="contained-modal-title-vcenter">
            Report an Issue
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl component="fieldset" style={{ marginTop: 10 }}>
            {/* <FormLabel component="legend">Issue Type </FormLabel> */}
            <RadioGroup
              aria-label="account"
              name="account1"
              value={this.state.issueType}
              onChange={this.handleChange}
            >
              <FormControlLabel
                value="missingItem"
                control={<Radio />}
                label="Missing Items"
              />
              <FormControlLabel
                value="incorrectOrder"
                control={<Radio />}
                label="Incorrect Order"
              />
              <FormControlLabel
                value="undelivered"
                control={<Radio />}
                label="Undelivered"
              />
              <FormControlLabel
                value="safety"
                control={<Radio />}
                label="Safety"
              />
            </RadioGroup>
          </FormControl>
          {/* undelivered order */}
          {this.state.issueType == "undelivered" ? (
            <div>
              <b style={{ marginRight: 5 }}>Remarks: </b>
              <input
                type="text"
                placeholder="optional"
                onChange={(e) => {
                  this.setState({ remarks: e.target.value });
                }}
              />
            </div>
          ) : null}

          {/* missing items  */}
          {this.state.issueType == "missingItem" ? (
            <div>
              <b>Which items were missing?</b>
              <div>
                {/* <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                  label="Bike"
                  style={{ height: 20, width: 20 }}
                />
                <label> I have a bike</label>
                <br></br> */}
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={this.state.productA}
                    style={{ height: 18, width: 18, verticalAlign: "middle" }}
                    onChange={() => {
                      this.setState({ productA: !this.state.productA });
                    }}
                  />
                  Product A
                </label>
              </div>
            </div>
          ) : null}

          {/* incorrect order */}
          {this.state.issueType == "incorrectOrder" ? (
            <div>
              <b>Please provide more details on the issue:</b>
              <input
                type="text"
                onChange={(e) => {
                  this.setState({ remarks: e.target.value });
                }}
              />
            </div>
          ) : null}

          {/* safety */}
          {this.state.issueType == "safety" ? (
            <div>
              <b>Safety</b>{" "}
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>
            Cancel
          </Button>
          <Button onClick={this.report}>Report</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
