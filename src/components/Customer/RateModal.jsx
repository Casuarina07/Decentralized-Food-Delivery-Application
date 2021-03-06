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

export class RateModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hawkerRating: 5,
      foodDeliveryRating: 5,
    };
  }

  submit = (event) => {
    let hawkerCommentValue;
    let foodDeliveryCommentValue;
    if (this.hawkerComment.value == "") {
      hawkerCommentValue = "-";
    } else {
      hawkerCommentValue = this.hawkerComment.value;
    }
    if (this.foodDeliveryComment.value == "") {
      foodDeliveryCommentValue = "-";
    } else {
      foodDeliveryCommentValue = this.foodDeliveryComment.value;
    }

    // this.props.setRating(
    //   this.props.orderId,
    //   this.props.seller,
    //   this.state.hawkerRating,
    //   hawkerCommentValue,
    //   this.props.driver,
    //   this.state.foodDeliveryRating,
    //   foodDeliveryCommentValue
    // );

    this.props.setRating(
      this.props.orderId,
      this.props.hawkerId,
      this.state.hawkerRating,
      hawkerCommentValue,
      this.props.fdId,
      this.state.foodDeliveryRating,
      foodDeliveryCommentValue
    );
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={this.props.onHide}>
          <Modal.Title id="contained-modal-title-vcenter">Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Box component="fieldset" mb={3} borderColor="transparent">
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
            </Box>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.submit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
