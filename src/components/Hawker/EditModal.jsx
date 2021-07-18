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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const { create } = require("ipfs-http-client");
const ipfs = create({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
});

export class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buffer: null,
      imageHash: "",
      imageChange: false,
      publish: true,
    };
  }

  submit = (event) => {
    event.preventDefault();
    let id, name, price, boolPublish;
    id = this.props.product.id;
    name = this.name.value;
    price = window.web3.utils.toWei(this.price.value.toString(), "Ether");
    boolPublish = this.publish;
    if (this.imageChange === true) {
      const file = ipfs.add(this.state.buffer);
      const resultPromise = file.then(function (result) {
        console.log("result", result.path.toString());
        return result.path.toString();
      });
      resultPromise.then((path) => {
        console.log("Path: ", path);
        this.setState({ imageHash: path });
        const img = this.state.imageHash;
        console.log("Img: ", img);
        //update product
        this.props.editProduct(
          id,
          name,
          price,
          this.state.imageHash,
          boolPublish
        );
      });
    } else {
      //update product with old imageHash
      this.props.editProduct(
        id,
        name,
        price,
        this.props.product.imageHash,
        boolPublish
      );
    }
    console.log(
      "Name: ",
      name,
      " Price: ",
      price,
      " Bool Publish: ",
      boolPublish,
      " Image Hash: " + this.state.imageHash
    );
  };

  handleSwitch = (event) => {
    this.publish = !this.publish;
    console.log("Publish State: ", this.publish);
  };

  captureFile = (event) => {
    this.imageChange = true;
    event.preventDefault();
    console.log("file captured...");
    //Process file for IPFS - convert to buffer
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
    };
  };

  render() {
    console.log("Passed: ", this.props.productId);
    console.log("Passed 2: ", this.props.product);
    console.log("Test: ", this.state.publish);
    return (
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={this.props.onHide}>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <form
            //onSubmit={saveChanges}
            >
              <b>Name: </b>
              <div>
                <input
                  id="name"
                  defaultValue={this.props.product.name}
                  type="text"
                  ref={(input) => {
                    this.name = input;
                  }}
                />
              </div>

              <b>Price: </b>
              <div>
                <input
                  id="price"
                  defaultValue={this.props.price}
                  type="number"
                  step="any"
                  ref={(input) => {
                    this.price = input;
                  }}
                />
              </div>

              <b>Change Image: </b>
              <div>
                {this.props.product.imageHash === "" ? (
                  <label>-</label>
                ) : (
                  <img
                    height="50"
                    width="120"
                    alt="logo"
                    src={
                      "https://ipfs.infura.io/ipfs/" +
                      this.props.product.imageHash
                    }
                  />
                )}
                <div style={{ display: "flex" }}>
                  <input
                    className="form-group mr-sm-1"
                    type="file"
                    onChange={this.captureFile}
                  />
                </div>
              </div>

              <FormControlLabel
                control={
                  <Switch
                    checked={this.publish}
                    onChange={this.handleSwitch}
                    color="primary"
                  />
                }
                label="Publish"
              />

              {/* <b>Opening Hours: </b>
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
              /> */}
            </form>
            {/* <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">
                Rate Food Stall: ({this.props.seller})
              </Typography>
              <Rating
                name="hawkerRating"
                value={this.state.hawkerRating}
                onChange={(event, newValue) => {
                  this.setState({ hawkerRating: newValue });
                }}
              />
              <Typography component="legend">Comments :</Typography>
              <input
                id="hawkerComment"
                type="text"
                ref={(input) => {
                  this.hawkerComment = input;
                }}
                className="form-control"
                placeholder="Optional"
              />
            </Box>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">
                Rate Delivery Rider: ({this.props.driver})
              </Typography>
              <Rating
                name="foodDeliveryRating"
                value={this.state.foodDeliveryRating}
                onChange={(event, newValue) => {
                  this.setState({ foodDeliveryRating: newValue });
                }}
              />
              <Typography component="legend">Comments :</Typography>
              <input
                id="foodDeliveryComment"
                type="text"
                ref={(input) => {
                  this.foodDeliveryComment = input;
                }}
                className="form-control"
                placeholder="Optional"
              />
            </Box> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.submit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
