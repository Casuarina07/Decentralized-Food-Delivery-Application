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
      seller: "",
      rider: "",
      hawkerId: 0,
      fdId: 0,
    };
  }

  handleShow = (event) => {
    this.rateShow = !this.rateShow;
    console.log("Rate Show: ", this.rateShow);
  };

  render() {
    let rateModalClose = () => this.setState({ rateModalShow: false });
    var counter = 1;
    var arrayCounter = 0;
    console.log("What is this now: ", this.props.custOrderItems);

    return (
      <div style={{ margin: 60, marginTop: 20 }}>
        <h2>Transaction History</h2>
        {this.props.custOrders.map((custOrder, key) => {
          this.orderNo = custOrder.id;
          this.itemCount = custOrder.purchasedItemCount;
          if (custOrder.state == 0) {
            this.orderState = "Order Placed";
          } else if (custOrder.state == 1) {
            this.orderState = "Finding Rider";
          } else if (custOrder.state == 2) {
            this.orderState = "Rider Confirmed";
          } else if (custOrder.state == 3) {
            this.orderState = "Rider Collected Food - Delivery in progress";
          } else if (custOrder.state == 4) {
            this.orderState = "Order Delivered";
          } else {
            this.orderState = "Order Cancelled";
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
            <div>
              <h4 style={{ display: "flex" }}>
                Ordered on: {custOrder.dateTime}
              </h4>
              <h5 style={{ display: "flex" }}>Status: {this.orderState}</h5>

              {custOrder.state >= 1 && custOrder.state < 4 ? (
                <div>
                  <h5 style={{ display: "flex" }}>
                    Estimated Delivery Time: {custOrder.deliveryDateTime}
                  </h5>
                </div>
              ) : null}

              {custOrder.state == 4 ? (
                <div>
                  <h5 style={{ display: "flex" }}>
                    Delivered at: {custOrder.deliveryDateTime}
                  </h5>
                </div>
              ) : null}

              {this.props.hawkers.map((hawker, key) => {
                if (hawker.owner == custOrder.seller) {
                  this.hawkerId = hawker.id;
                  return (
                    <div style={{ display: "flex" }}>
                      <h5>Ordered from: {hawker.name}</h5>
                    </div>
                  );
                }
              })}

              {this.props.foodDeliveries.map((fd, key) => {
                if (fd.owner == custOrder.rider) {
                  this.fdId = fd.id;
                }
              })}

              {/* allow customer to rate the transaction after completion */}
              {custOrder.state == 4 ? (
                <div style={{ display: "flex", marginBottom: 10 }}>
                  {custOrder.rated == false ? (
                    <ButtonToolbar>
                      <Button
                        variant="primary"
                        onClick={() => {
                          this.setState({ rateModalShow: true });
                          this.setState({ seller: custOrder.seller });
                          this.setState({ rider: custOrder.rider });
                        }}
                      >
                        Rate
                      </Button>
                      <RateModal
                        show={this.state.rateModalShow}
                        modalId={custOrder.id}
                        onHide={rateModalClose}
                        orderId={custOrder.id}
                        hawkers={this.props.hawkers}
                        seller={this.state.seller}
                        driver={this.state.rider}
                        setRating={this.props.setRating}
                        hawkerId={this.hawkerId}
                        fdId={this.fdId}
                      />
                    </ButtonToolbar>
                  ) : (
                    <Button
                      variant="primary"
                      disabled
                      style={{ pointerEvents: "none", opacity: 0.5 }}
                    >
                      Rated
                    </Button>
                  )}
                </div>
              ) : null}

              {/* allow customer to cancel if hawker have not accepted the order yet */}
              {custOrder.state == 0 ? (
                <Button
                  style={{ display: "flex", marginBottom: 10 }}
                  variant="danger"
                  onClick={(event) => {
                    this.props.cancelOrder(custOrder.id, custOrder.owner);
                  }}
                >
                  Cancel
                </Button>
              ) : null}

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Qty</th>
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
                        <td>
                          {this.props.restProducts[product.productId - 1].name}
                        </td>
                        <td>
                          {window.web3.utils.fromWei(
                            this.props.restProducts[
                              product.productId - 1
                            ].price.toString(),
                            "Ether"
                          )}{" "}
                          Eth
                        </td>
                        <td>{product.productQty}</td>
                        <td>
                          {this.props.restProducts[product.productId - 1]
                            .imageHash == "" ? (
                            <label>-</label>
                          ) : (
                            <img
                              height="50"
                              width="120"
                              alt="logo"
                              src={
                                "https://ipfs.infura.io/ipfs/" +
                                this.props.restProducts[product.productId - 1]
                                  .imageHash
                              }
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <h5 style={{ display: "flex", justifyContent: "flex-end" }}>
                Subtotal:{" "}
                {window.web3.utils.fromWei(
                  custOrder.totalPrice.toString(),
                  "Ether"
                )}{" "}
                Eth
              </h5>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Orders;
