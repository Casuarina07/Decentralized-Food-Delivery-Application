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

export class ReportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueType: "",
      remarks: "-",
      buffer: null,
      imageHash: [],
      imageChange: false,
      productA: true,
      products: [],
    };
  }

  report = (event) => {
    console.log("report button clicked");

    //missing items
    var missingItems = [];
    var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    for (var i = 0; i < checkboxes.length; i++) {
      missingItems.push(checkboxes[i].value);
    }
    console.log("Missing Items: ", missingItems);
    console.log("Images Hash: ", this.state.imageHash);
    console.log("Remarks: ", this.state.remarks);

    if (this.state.issueType != "" && this.state.imageChange == false) {
      alert("Please add one supporting image");
    }

    this.props.createReport(
      this.props.order.id,
      this.state.issueType,
      this.state.imageHash,
      missingItems,
      this.state.remarks
    );

    if (this.state.issueType == "missingItem") {
    } else if (this.state.issueType == "incorrectOrder") {
    } else if (this.state.issueType == "undelivered") {
    } else if (this.state.issueType == "safety") {
    } else if (this.state.issueType == "") {
      alert("Please select one option to report (if any)");
    }
  };

  handleChange = (event) => {
    this.setState({ issueType: event.target.value });
  };

  // change = (event) => {
  //   console.log("idk", event.target.value);
  // };

  captureFile = async (event) => {
    this.setState({ imageHash: [] });
    const { create } = require("ipfs-http-client");
    const ipfs = create({
      host: "ipfs.infura.io",
      port: "5001",
      protocol: "https",
    });
    // this.imageChange = true;
    this.setState({ imageChange: true });
    event.preventDefault();
    console.log("file captured...");
    //Process file for IPFS - convert to buffer
    for (var i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      const hash = await ipfs.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      this.setState({ imageHash: [...this.state.imageHash, hash.path] });
    }
  };

  render() {
    console.log("Order: ", this.props.order.id);
    console.log("All Customer Orders: ", this.props.orders);
    console.log("All Customer Order Items: ", this.props.orderItems);
    console.log("All Customer Key: ", this.props.key);
    console.log("What is this: ", this.state.showStatus);

    var items = [];
    {
      this.props.orderItems.map((item, key) => {
        if (item.orderId == this.props.order.id) {
          items.push(
            <div>
              <label>
                <input
                  class="checkbox"
                  type="checkbox"
                  style={{
                    height: 18,
                    width: 18,
                    // verticalAlign: "middle",
                  }}
                  value={this.props.restProducts[item.productId - 1].name}
                />{" "}
                {this.props.restProducts[item.productId - 1].name}
              </label>
            </div>
          );
        }
      });
    }

    console.log("Products state: ", this.state.products);
    return (
      <Modal
        show={this.props.show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={(event) => this.props.onHide(event)}>
          <Modal.Title id="contained-modal-title-vcenter">
            Report an Issue
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Ordered on: {this.props.order.dateTime}</h5>

          <h5>Delivered at: {this.props.order.deliveryDateTime}</h5>
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
          {/* missing items  */}
          {this.state.issueType == "missingItem" ? (
            <div>
              <b>Which items were missing?</b>
              <div>{items}</div>
              <div style={{ marginTop: 10 }}>
                <b>Upload any supporting images:</b>
                <div style={{ display: "flex" }}>
                  <input
                    className="form-group mr-sm-1"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={this.captureFile}
                  />
                </div>
              </div>
              <b>Any additional remarks?</b>
              <div>
                <textarea
                  type="text"
                  onChange={(e) => {
                    this.setState({ remarks: e.target.value });
                  }}
                  style={{ width: "75%" }}
                />
              </div>
            </div>
          ) : null}

          {/* incorrect order */}
          {this.state.issueType == "incorrectOrder" ? (
            <div>
              <b style={{ marginRight: 5 }}>
                Please provide more details on the order:
              </b>
              <textarea
                type="text"
                onChange={(e) => {
                  this.setState({ remarks: e.target.value });
                }}
                style={{ width: "75%" }}
              />

              <div style={{ marginTop: 10 }}>
                <b>Upload any supporting images:</b>
                <div style={{ display: "flex" }}>
                  <input
                    className="form-group mr-sm-1"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={this.captureFile}
                  />
                </div>
              </div>
            </div>
          ) : null}

          {/* undelivered order */}
          {this.state.issueType == "undelivered" ? (
            <div>
              <b style={{ marginRight: 5 }}>Remarks: </b>
              <div>
                <textarea
                  type="text"
                  placeholder="optional"
                  onChange={(e) => {
                    this.setState({ remarks: e.target.value });
                  }}
                  style={{ width: "75%" }}
                />
              </div>
            </div>
          ) : null}

          {/* safety */}
          {this.state.issueType == "safety" ? (
            <div>
              <b style={{ marginRight: 5 }}>
                Please provide more details on the safety issue:
              </b>
              <textarea
                type="text"
                onChange={(e) => {
                  this.setState({ remarks: e.target.value });
                }}
                style={{ width: "75%" }}
              />
              <div style={{ marginTop: 10 }}>
                <b>Upload any supporting images:</b>
                <div style={{ display: "flex" }}>
                  <input
                    className="form-group mr-sm-1"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={this.captureFile}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={(event) => this.props.onHide(event)}
          >
            Cancel
          </Button>
          <Button onClick={this.report}>Report</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
