import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { getEstDeliveryTime, getHawkerFdTime } from "../utils/utils-time";
import { HawkerModal } from "./HawkerModal";
import axios from "axios";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNo: 0,
      itemCount: 0,
      orderState: 0,
      modalShow: false,
      hawkerTime: "",
      deliveryTime: "",
      hawkerLeadTime: "",
    };
  }

  componentDidMount() {
    this.retrieveHawkerDetails();
  }

  retrieveHawkerDetails = () => {
    const hawkerDetails = axios
      .get("https://ipfs.infura.io/ipfs/" + this.props.hawker.profileHash)
      .then(function (response) {
        console.log("this is the data: ", response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    hawkerDetails.then((details) => {
      this.setState({ hawkerLeadTime: details.leadTime });
    });
  };

  render() {
    let modalClose = () => this.setState({ modalShow: false });

    console.log(this.props.hawkerOrderItems);
    console.log("Hawker orders: ", this.props.hawkerOrders);
    console.log("Hawker orders: ", this.props.hawkerOrderItems);

    var counter = 1;
    var arrayCounter = 0;
    return (
      <div style={{ margin: 60, marginTop: 20 }}>
        <h2>Transactions</h2>
        <hr style={{ width: "100%", display: "flex" }} />
        {this.props.hawkerOrders.map((hawkerOrder, key) => {
          this.orderNo = hawkerOrder.id;
          this.itemCount = hawkerOrder.purchasedItemCount;

          if (hawkerOrder.state == 0) {
            this.orderState = "Order Placed";
          } else if (hawkerOrder.state == 1) {
            this.orderState = "Finding Rider";
          } else if (hawkerOrder.state == 2) {
            this.orderState = "Rider Confirmed";
          } else if (hawkerOrder.state == 3) {
            this.orderState = "Rider Collected Food";
          } else if (hawkerOrder.state == 4) {
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
            <>
              <h4 style={{ display: "flex" }}>{hawkerOrder.owner}</h4>

              <h4 style={{ display: "flex" }}>
                Ordered on: {hawkerOrder.dateTime}
              </h4>

              {hawkerOrder.state == 4 ? (
                <div>
                  <h4 style={{ display: "flex" }}>
                    Delivered at : {hawkerOrder.deliveryDateTime}
                  </h4>
                </div>
              ) : null}

              <h5 style={{ display: "flex" }}>Status: {this.orderState}</h5>

              {hawkerOrder.state >= 2 && hawkerOrder.state < 5 ? (
                <div>
                  <h5 style={{ display: "flex" }}>
                    Rider: {hawkerOrder.rider}
                  </h5>
                </div>
              ) : null}

              <div style={{ display: "flex", marginBottom: 10 }}>
                {hawkerOrder.state == 0 ? (
                  <div>
                    <Button
                      style={{ marginRight: 5 }}
                      variant="danger"
                      onClick={(event) => {
                        this.props.cancelOrder(
                          hawkerOrder.id,
                          hawkerOrder.owner
                        );
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={(event) => {
                        // var leadtime = this.props.hawker.leadTime;
                        // console.log("hawker: ", leadtime);
                        // console.log(
                        //   "what is this: ",
                        //   getCurrentTimePlusLeadTime(Number(leadtime))
                        // );
                        // let estTime = getCurrentTimePlusLeadTime(
                        //   Number(leadtime)
                        // );
                        // this.props.hawkerConfirmOrder(hawkerOrder.id, estTime);
                        var hawkerEstTime = getHawkerFdTime(
                          Number(this.state.hawkerLeadTime)
                        );
                        var deliveryEstTime = getEstDeliveryTime(
                          Number(this.state.hawkerLeadTime)
                        );
                        console.log("est time: ", hawkerEstTime);
                        this.setState({ hawkerTime: hawkerEstTime });
                        this.setState({ deliveryTime: deliveryEstTime });
                        this.setState({ modalShow: true });
                      }}
                    >
                      Accept
                    </Button>
                    <HawkerModal
                      show={this.state.modalShow}
                      onHide={modalClose}
                      // hawker={this.props.hawker}
                      orderId={hawkerOrder.id}
                      hawkerTime={this.state.hawkerTime}
                      deliveryTime={this.state.deliveryTime}
                      hawkerConfirmOrder={this.props.hawkerConfirmOrder}
                    />
                  </div>
                ) : null}
              </div>

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
                  {this.props.hawkerOrderItems.map((product, key) => {
                    product = this.props.hawkerOrderItems[arrayCounter];

                    if (counter >= this.itemCount) {
                      return;
                    }
                    if (arrayCounter >= this.props.hawkerOrderItems.length) {
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
            </>
          );
        })}
      </div>
    );
  }
}

export default Orders;
