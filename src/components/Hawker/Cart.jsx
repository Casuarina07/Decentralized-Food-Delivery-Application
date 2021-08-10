import React, { Component } from "react";
import { getCurrentDate } from "../utils/utils-date";
import { getCurrentTime } from "../utils/utils-time";
import Card from "react-bootstrap/Card";
import DatePicker from "react-datepicker";
import { ImCross } from "react-icons/im";
import { Button } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    let currentDate = new Date();
    let minDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    this.state = {
      deliveryDate: minDate,
      minDate: minDate,
      deliveryTime: "6:00-6:30",
    };
  }

  handleChangeTime = (event) => {
    // setFromDeliveryTime(event.target.value);
    this.setState({ deliveryTime: event.target.value });
  };
  checkOut = (event) => {
    event.preventDefault();
  };

  render() {
    const minimumOrder = 0.0033;
    const deliveryFee = 0.0012;
    var totalCost = 0;
    var seller = "";
    let smallOrderFee;
    var hawkerPayment = 0;
    var riderPayment = 0;

    var hrs = [];
    for (var i = 0; i <= 48; i++) {
      var n = i % 2 == 0 ? i / 2 + ":00" : (i + 1) / 2 - 1 + ":30";
      if (n < 10) {
        n = "0" + n;
      }
      hrs.push(n);
    }
    //timeslots from 7am-830pm
    var timeSlots = [];
    for (var i = 12; i < hrs.length - 7; i = i + 2) {
      timeSlots.push(
        <option value={hrs[i] + "-" + hrs[i + 1]}>
          {hrs[i] + "-" + hrs[i + 1]}
        </option>
      );
    }

    if (this.props.hawkerCart.length > 0) {
      return (
        <div style={{ margin: 60, marginTop: 20 }}>
          <h2>Cart</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                {/* <th scope="col">Owner</th> */}
                <th scope="col">Image</th>
                <th scope="col">Qty</th>
                <th scope="col"></th>
              </tr>
            </thead>
            {this.props.hawkerCart.map((cart, key) => {
              return (
                <>
                  <tbody id="productList">
                    {this.props.suppProducts.map((product, key) => {
                      if (product.id == cart[0]) {
                        totalCost += +product.price * cart[1];
                        seller = product.owner;
                        return (
                          <tr>
                            <td>{product.name}</td>
                            <td>
                              {window.web3.utils.fromWei(
                                product.price.toString(),
                                "Ether"
                              )}{" "}
                              Eth
                            </td>
                            {/* <td>{product.owner}</td> */}
                            <td>
                              {product.imageHash == "" ? (
                                <label>-</label>
                              ) : (
                                <img
                                  height="50"
                                  width="120"
                                  alt="logo"
                                  src={
                                    "https://ipfs.infura.io/ipfs/" +
                                    product.imageHash
                                  }
                                />
                              )}
                            </td>
                            <td>{cart[1]}</td>
                            <td>
                              {/* <button
                                onClick={(event) => {
                                  //   this.props.removeProdCart(
                                  //     this.props.custId,
                                  //     cart
                                  //   );
                                }}
                              >
                                Remove
                              </button> */}
                              <ImCross
                                size="18"
                                style={{ color: "red", cursor: "pointer" }}
                                // onClick={(event) => {
                                //   this.props.removeProdCart(
                                //     this.props.custId,
                                //     key + 1
                                //   );
                                // }}
                              />
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </>
              );
            })}
          </table>
          <div style={{ display: "flex" }}>
            <Card
              style={{ marginTop: 15, flexDirection: "row", width: "100%" }}
            >
              <Card.Img
                style={{
                  width: 150,
                  height: 150,
                  margin: 20,
                }}
                variant="top"
                // src={"https://ipfs.infura.io/ipfs/" + product.imageHash}
              />
              <div
                style={{
                  float: "left",
                  flexDirection: "column",
                  marginTop: 20,
                }}
              >
                <Card.Title>YOO</Card.Title>
                <Card.Text>
                  {/* {" "}
                {window.web3.utils.fromWei(
                  product.price.toString(),
                  "Ether"
                )}{" "} */}
                  Eth
                </Card.Text>
                <label>Hi</label>
                <Card.Text>Packaging Size:</Card.Text>
                <Card.Text>Minimum Order (unit): </Card.Text>
              </div>
              <label style={{ float: "left" }}>Hi</label>
            </Card>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            {" "}
            <label style={{ marginRight: 10, size: 20 }}>Delivery Date:</label>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              minDate={this.state.minDate}
              selected={this.state.deliveryDate}
              onChange={(date) => this.setState({ deliveryDate: date })}
            />
            <label style={{ marginLeft: 10, size: 20 }}>Delivery Time:</label>
            <select
              style={{ marginLeft: 5 }}
              value={this.state.deliveryTime}
              onChange={this.handleChangeTime}
            >
              {timeSlots}
            </select>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 5,
              fontSize: 20,
            }}
          >
            Total Cost:{" "}
            {window.web3.utils.fromWei(totalCost.toString(), "Ether")} Eth
          </div>

          <div
            style={{
              marginBottom: 20,
              marginTop: 10,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={(event) => {
                var dateTime = getCurrentDate() + " " + getCurrentTime();
                var deliveryDateTime =
                  this.state.deliveryDate.toLocaleDateString("en-GB") +
                  ", " +
                  this.state.deliveryTime;
                console.log("Ordered at: ", dateTime);
                console.log("Delivery DateTime: ", deliveryDateTime);

                this.props.purchaseProduct(
                  2,
                  this.props.hawkerId,
                  seller,
                  hawkerPayment,
                  riderPayment,
                  totalCost,
                  dateTime,
                  deliveryDateTime
                );
              }}
            >
              Confirm Purchase
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="danger"
              onClick={(event) => {
                this.props.removeAllProdCart(this.props.hawkerId, 2);
              }}
            >
              Remove All Products
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ margin: 60, marginTop: 20 }}>
          <h2>Empty Cart</h2>
        </div>
      );
    }
  }
}

export default Cart;
