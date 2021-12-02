import React, { Component } from "react";
import { FdModal } from "./FdModal";
import { getCurrentTime, getHawkerFdTime } from "../utils/utils-time";
import { Button } from "react-bootstrap";
import axios from "axios";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNo: 0,
      itemCount: 0,
      orderState: 0,
      disable: false,
      fdId: this.props.fdDelivery.id,
      leadTime: 10,
      modalShow: false,
      fdTime: "",
      hawkersAddress: [],
      hawkersLeadTime: [],
      customersAddress: [],
    };
  }

  retrieveHawkersDetails = () => {
    {
      this.props.hawkers.map((hawker, key) => {
        const hawkerDetails = axios
          .get("https://ipfs.infura.io/ipfs/" + hawker.profileHash)
          .then(function (response) {
            console.log("this is the data: ", response.data);
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
        const hName = hawkerDetails.then((details) => {
          this.setState({
            hawkersAddress: [
              ...this.state.hawkersAddress,
              details.addressLocation,
            ],
          });
          this.setState({
            hawkersLeadTime: [...this.state.hawkersLeadTime, details.leadTime],
          });
        });
      });
    }
  };

  retrieveCustomerDetails = () => {
    {
      this.props.customers.map((customer, key) => {
        const customerDetails = axios
          .get("https://ipfs.infura.io/ipfs/" + customer.profileHash)
          .then(function (response) {
            console.log("this is the data: ", response.data);
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
        const custName = customerDetails.then((details) => {
          this.setState({
            customersAddress: [
              ...this.state.customersAddress,
              details.addressLocation,
            ],
          });
        });
      });
    }
  };

  componentDidMount() {
    this.retrieveHawkersDetails();
    this.retrieveCustomerDetails();
  }

  render() {
    var counter = 1,
      counter2 = 1;
    var arrayCounter = 0,
      arrayCounter2 = 0;
    {
      this.props.fdDelivery.available
        ? (this.disable = false)
        : (this.disable = true);
    }
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <div style={{ margin: 60, marginTop: 20 }}>
        {console.log("Accepted Orders: ", this.props.fdAcceptedOrders)}

        {/* Ongoing Orders */}
        {this.props.fdOngoingOrders.length > 0 ? (
          <div>
            {" "}
            <h2 style={{ color: "orange" }}>Ongoing orders</h2>
            <hr style={{ width: "100%", display: "flex" }} />
          </div>
        ) : null}

        {this.props.fdOngoingOrders.map((fdOngoingOrder, key) => {
          this.orderNo = fdOngoingOrder.id;
          this.itemCount = fdOngoingOrder.purchasedItemCount;
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
                Placed by: {fdOngoingOrder.owner}
              </h4>

              <h4 style={{ display: "flex" }}>
                {fdOngoingOrder.date} {fdOngoingOrder.time}
              </h4>

              {this.props.hawkers.map((hawker, key) => {
                if (hawker.owner.toString() == fdOngoingOrder.seller) {
                  return (
                    <h5 style={{ display: "flex" }}>
                      Hawker Address: {this.state.hawkersAddress[key]}
                    </h5>
                  );
                }
              })}

              {this.props.customers.map((customer, key) => {
                if (customer.owner.toString() == fdOngoingOrder.owner)
                  return (
                    <h5 style={{ display: "flex" }}>
                      Customer Address: {this.state.customersAddress[key]}
                    </h5>
                  );
              })}

              {fdOngoingOrder.state == 2 ? (
                <Button
                  style={{
                    display: "flex",
                    marginBottom: 10,
                  }}
                  onClick={(event) => {
                    this.props.fdCollectedOrder(fdOngoingOrder.id);
                  }}
                >
                  Collected
                </Button>
              ) : null}

              {fdOngoingOrder.state == 3 ? (
                <Button
                  style={{ display: "flex", marginBottom: 10 }}
                  onClick={(event) => {
                    // console.log("Pressed at: ", getCurrentTime());
                    var deliveredTime = getCurrentTime();
                    this.props.fdCompleteOrder(
                      fdOngoingOrder.id,
                      this.state.fdId,
                      deliveredTime
                    );
                  }}
                >
                  Complete
                </Button>
              ) : null}

              {fdOngoingOrder.state == 4 ? (
                <Button
                  style={{
                    display: "flex",
                    marginBottom: 10,
                    opacity: 0.6,
                    pointerEvents: "none",
                  }}
                >
                  Completed
                </Button>
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
                  {this.props.fdOngoingOrderItems.map((product, key) => {
                    product = this.props.fdOngoingOrderItems[arrayCounter];

                    if (counter >= this.itemCount) {
                      return;
                    }
                    if (arrayCounter >= this.props.fdOngoingOrderItems.length) {
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
                        <td>
                          {this.props.restProducts[product.productId - 1]
                            .imageHash == "" ? (
                            <label>-</label>
                          ) : (
                            <img
                              height="70"
                              width="70"
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

        {/* Available Orders */}
        {this.props.fdDeliveryOrders.length < 1 ? (
          <div>
            <h2>No available orders</h2>
            <hr style={{ width: "100%", display: "flex" }} />
          </div>
        ) : (
          <div>
            {" "}
            <h2>Available Orders</h2>
            <hr style={{ width: "100%", display: "flex" }} />
          </div>
        )}
        {this.props.fdDeliveryOrders.map((fdDeliveryOrder, key) => {
          this.orderNo = fdDeliveryOrder.id;
          this.itemCount = fdDeliveryOrder.purchasedItemCount;

          if (fdDeliveryOrder.state == 0) {
            this.orderState = "Order Placed";
          } else if (fdDeliveryOrder.state == 1) {
            this.orderState = "Finding Rider";
          } else if (fdDeliveryOrder.state == 2) {
            this.orderState = "Rider Confirmed";
          } else if (fdDeliveryOrder.state == 3) {
            this.orderState = "Order Collected";
          } else if (fdDeliveryOrder.state == 4) {
            this.orderState = "Order Completed";
          } else {
            this.orderState = "Order Cancelled";
          }
          counter2 = 0;
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
                Placed by: {fdDeliveryOrder.owner}
              </h4>

              <h4 style={{ display: "flex" }}>
                {fdDeliveryOrder.date} {fdDeliveryOrder.time}
              </h4>
              <h5 style={{ display: "flex" }}>Status: {this.orderState}</h5>
              {this.props.hawkers.map((hawker, key) => {
                if (hawker.owner.toString() == fdDeliveryOrder.seller) {
                  this.leadTime = this.state.hawkersLeadTime[key];

                  return (
                    <h5 style={{ display: "flex" }}>
                      Hawker Address: {this.state.hawkersAddress[key]}
                    </h5>
                  );
                }
              })}

              {this.props.customers.map((customer, key) => {
                if (customer.owner.toString() == fdDeliveryOrder.owner)
                  return (
                    <h5 style={{ display: "flex" }}>
                      Customer Address: {this.state.customersAddress[key]}
                    </h5>
                  );
              })}
              <div style={{ display: "flex", marginBottom: 10 }}>
                {fdDeliveryOrder.state == 1 && this.disable == false ? (
                  <Button
                    onClick={(event) => {
                      this.setState({ modalShow: true });
                      var fdEstTime = getHawkerFdTime(Number(this.leadTime));
                      this.fdTime = fdEstTime;
                      // this.props.fdAcceptOrder(fdDeliveryOrder.id);
                    }}
                  >
                    Accept
                  </Button>
                ) : (
                  <Button
                    style={{ opacity: 0.6 }}
                    onClick={(event) => {
                      alert("Please start shift");
                    }}
                  >
                    Accept
                  </Button>
                )}
                <FdModal
                  show={this.state.modalShow}
                  onHide={modalClose}
                  fdTime={this.fdTime}
                  orderId={fdDeliveryOrder.id}
                  fdAcceptOrder={this.props.fdAcceptOrder}
                />
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Image</th>
                    <th scope="col"></th>
                  </tr>
                </thead>

                <tbody id="productList">
                  {this.props.fdOrderItems.map((product, key) => {
                    product = this.props.fdOrderItems[arrayCounter2];

                    if (counter2 >= this.itemCount) {
                      return;
                    }
                    if (arrayCounter2 >= this.props.fdOrderItems.length) {
                      return;
                    }

                    counter2++;
                    arrayCounter2++;
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
                              height="70"
                              width="70"
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
        {/* Completed Orders */}
        {this.props.fdCompletedOrders.length > 0 ? (
          <div>
            {" "}
            <h2 style={{ color: "green" }}>Completed orders</h2>
            <hr style={{ width: "100%", display: "flex" }} />
          </div>
        ) : null}
        {this.props.fdCompletedOrders.map((fdCompletedOrder, key) => {
          this.orderNo = fdCompletedOrder.id;
          this.itemCount = fdCompletedOrder.purchasedItemCount;
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
                Placed by: {fdCompletedOrder.owner}
              </h4>

              <h4 style={{ display: "flex" }}>
                {fdCompletedOrder.date} {fdCompletedOrder.time}
              </h4>

              {this.props.hawkers.map((hawker, key) => {
                if (hawker.owner.toString() == fdCompletedOrder.seller) {
                  return (
                    <h5 style={{ display: "flex" }}>
                      Hawker Address: {this.state.hawkersAddress[key]}
                    </h5>
                  );
                }
              })}

              {this.props.customers.map((customer, key) => {
                if (customer.owner.toString() == fdCompletedOrder.owner)
                  return (
                    <h5 style={{ display: "flex" }}>
                      Customer Address: {this.state.customersAddress[key]}
                    </h5>
                  );
              })}

              {fdCompletedOrder.state == 4 ? (
                <Button
                  style={{
                    display: "flex",
                    marginBottom: 10,
                    opacity: 0.6,
                    pointerEvents: "none",
                  }}
                >
                  Completed
                </Button>
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
                  {this.props.fdCompletedOrderItems.map((product, key) => {
                    product = this.props.fdCompletedOrderItems[arrayCounter];

                    if (counter >= this.itemCount) {
                      return;
                    }
                    if (
                      arrayCounter >= this.props.fdCompletedOrderItems.length
                    ) {
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
                        <td>
                          {this.props.restProducts[product.productId - 1]
                            .imageHash == "" ? (
                            <label>-</label>
                          ) : (
                            <img
                              height="70"
                              width="70"
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
