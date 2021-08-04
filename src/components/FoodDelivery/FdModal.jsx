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
import { getEstDeliveryTime, getHawkerFdTime } from "../utils/utils-time";

export class FdModal extends Component {
  constructor(props) {
    super(props);
  }

  confirm = (event) => {
    console.log("confirmed");
    this.props.fdAcceptOrder(this.props.orderId);
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        size="small"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirm Transaction
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Please collect food by <b>{this.props.fdTime}</b>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>
            Cancel
          </Button>
          <Button onClick={this.confirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
