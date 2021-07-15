import React, { Component } from "react";
import { BsConeStriped } from "react-icons/bs";
import Modal from "@material-ui/core/Modal";
import "./Cust.css";
import { Button, ButtonToolbar } from "react-bootstrap";
import { RateModal } from "./RateModal";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNo: 0,
      itemCount: 0,
      orderState: 0,
      rateModalShow: false,
    };
  }

  handleShow = (event) => {
    this.rateShow = !this.rateShow;
    console.log("Rate Show: ", this.rateShow);
  };

  render() {
    let rateModalClose = () => this.setState({ rateModalShow: false });
    console.log("History: ", this.props.custOrderItems);
    var counter = 1;
    var arrayCounter = 0;
    return (
      <div style={{ margin: 60, marginTop: 20 }}>
        <h2>Transaction History</h2>
        {this.props.custOrders.map((custOrder, key) => {
          this.orderNo = custOrder.id;
          this.itemCount = custOrder.purchasedItemCount;
          if (custOrder.state == 0) {
            this.orderState = "Order Placed";
          } else if (custOrder.state == 1) {
            this.orderState = "Finding Driver";
          } else if (custOrder.state == 2) {
            this.orderState = "Driver Confirmed";
          } else {
            this.orderState = "Order Completed";
          }
          counter = 0;
          console.log(
            "Order ",
            this.orderNo,
            " have ",
            this.itemCount,
            "items"
          );
          return (
            <>
              <h4 style={{ display: "flex" }}>
                {custOrder.date} {custOrder.time}
              </h4>
              <h4 style={{ display: "flex" }}></h4>
              <h5 style={{ display: "flex" }}>Status: {this.orderState}</h5>
              {custOrder.state == 3 ? (
                <div style={{ display: "flex", marginBottom: 10 }}>
                  <ButtonToolbar>
                    <Button
                      variant="primary"
                      onClick={() => {
                        this.setState({ rateModalShow: true });
                        console.log(
                          "What is this now: ",
                          this.state.rateModalShow
                        );
                      }}
                    >
                      Rate
                    </Button>
                    <RateModal
                      show={this.state.rateModalShow}
                      onHide={rateModalClose}
                    />
                  </ButtonToolbar>
                </div>
              ) : null}
              {custOrder.state >= 2 && custOrder.state < 3 ? (
                <div>
                  <h5 style={{ display: "flex" }}>Delivery in Progress</h5>
                  <h5 style={{ display: "flex" }}>
                    Driver: {custOrder.driver}
                  </h5>
                </div>
              ) : null}

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Image</th>
                    <th scope="col"></th>
                  </tr>
                </thead>

                <tbody id="productList">
                  {this.props.custOrderItems.map((product, key) => {
                    product = this.props.custOrderItems[arrayCounter];

                    if (counter >= this.itemCount) {
                      return;
                    }
                    if (arrayCounter >= this.props.custOrderItems.length) {
                      return;
                    }

                    counter++;
                    arrayCounter++;
                    return (
                      <tr key={key}>
                        <td>{product.name}</td>
                        <td>
                          {window.web3.utils.fromWei(
                            product.price.toString(),
                            "Ether"
                          )}{" "}
                          Eth
                        </td>
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          );
        })}
      </div>
    );
  }
}

export default Orders;
