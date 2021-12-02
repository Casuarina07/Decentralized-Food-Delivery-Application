import React, { Component } from "react";
import { BsConeStriped } from "react-icons/bs";
import Modal from "@material-ui/core/Modal";
import { Button, ButtonToolbar } from "react-bootstrap";
import { RateModal } from "./RateModal";
import { Link } from "@reach/router";
import axios from "axios";

class Home extends Component {
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
      supplierNames: [],
    };
  }

  retrieveSupplierNames = () => {
    {
      this.props.suppliers.map((supplier, key) => {
        const supplierDetails = axios
          .get("https://ipfs.infura.io/ipfs/" + supplier.profileHash)
          .then(function (response) {
            console.log("this is the data: ", response.data);
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
        const sName = supplierDetails.then((details) => {
          this.setState({
            supplierNames: [...this.state.supplierNames, details.name],
          });
        });
      });
    }
  };

  componentDidMount() {
    this.retrieveSupplierNames();
  }

  handleShow = (event) => {
    this.rateShow = !this.rateShow;
    console.log("Rate Show: ", this.rateShow);
  };

  render() {
    let rateModalClose = () => this.setState({ rateModalShow: false });
    var counter = 1;
    var arrayCounter = 0;
    let overallSales = 0;
    let issueType = "";
    console.log("Loading...", this.props.loading);
    return (
      <div style={{ margin: 60, marginTop: 20 }}>
        <div style={{ marginTop: 30, marginBottom: 30 }}>
          <h2 style={{ color: "#808080" }}>Sales</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col"> Sold</th>
                <th scope="col">Total Sales</th>
              </tr>
            </thead>
            {this.props.restProducts.map((product, key) => {
              if (product.owner == this.props.account) {
                overallSales += product.price * product.soldCount;
                return (
                  <tbody id="productList">
                    <tr>
                      <td>{product.name}</td>
                      <td>{product.soldCount}</td>
                      <td>
                        {window.web3.utils.fromWei(
                          (product.price * product.soldCount).toString(),
                          "Ether"
                        )}{" "}
                        Eth
                      </td>
                    </tr>
                  </tbody>
                );
              }
            })}
          </table>
          <h4 style={{ display: "flex", justifyContent: "flex-end" }}>
            Overall Sales:{" "}
            {window.web3.utils.fromWei(overallSales.toString(), "Ether")} Eth
          </h4>
        </div>

        <div style={{ marginTop: 30, marginBottom: 30 }}>
          <h2 style={{ color: "#808080" }}>Reports Linked to You</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Made by</th>
                <th scope="col">Reported for</th>
                <th scope="col">Status/Outcome</th>
                <th scope="col">Details</th>
                <th scope="col"></th>
              </tr>
            </thead>
            {this.props.hawkerReports.map((hawkerReport, key) => {
              if (hawkerReport.title == "missingItem") {
                issueType = "Missing Item";
              } else if (hawkerReport.title == "incorrectOrder") {
                issueType = "Incorrect order";
              } else if (hawkerReport.title == "undelivered") {
                issueType = "Undelivered order";
              } else {
                issueType = "Safety issues";
              }
              let complete = false;
              let reportDate = new Date(hawkerReport.deadlineDate * 1000);
              if (new Date() > reportDate) {
                complete = true;
              }
              return (
                <tbody id="productList">
                  <tr>
                    <td>{hawkerReport.owner}</td>
                    <td>{issueType}</td>
                    {complete ? (
                      <>
                        <td style={{ color: "#DC0126", fontWeight: "bold" }}>
                          Completed{" "}
                          {hawkerReport.approvalCount >=
                          hawkerReport.rejectionCount ? (
                            <>
                              <label
                                style={{ color: "green", marginBottom: 10 }}
                              >
                                (Successful)
                              </label>
                            </>
                          ) : (
                            <label style={{ color: "red", marginBottom: 10 }}>
                              (Unsuccessful)
                            </label>
                          )}
                        </td>
                      </>
                    ) : (
                      <td
                        style={{
                          color: "green",
                          fontWeight: "bold",
                        }}
                      >
                        Pending
                      </td>
                    )}
                    <td>
                      <h5
                        style={{
                          backgroundColor: "#226BBF",
                          borderRadius: 4,
                          paddingLeft: 6,
                          paddingRight: 6,
                          paddingBottom: 7,
                          paddingTop: 7,
                          alignItems: "center",
                        }}
                      >
                        <Link
                          style={{
                            color: "#FFF",
                            fontSize: 18,
                            textDecoration: "none",
                          }}
                          to={`/reportDetails/${hawkerReport.id}`}
                          state={{ hawkerReport: hawkerReport }}
                        >
                          Details
                        </Link>
                      </h5>
                    </td>
                    <td>
                      {complete && hawkerReport.resolved ? (
                        <Button
                          disabled
                          variant="danger"
                          onClick={() => {
                            this.props.resolveReport(
                              hawkerReport.id,
                              hawkerReport.owner,
                              hawkerReport.claimAmt
                            );
                          }}
                        >
                          Resolved
                        </Button>
                      ) : null}
                      {complete && !hawkerReport.resolved ? (
                        <Button
                          variant="danger"
                          onClick={() => {
                            this.props.resolveReport(
                              hawkerReport.id,
                              hawkerReport.owner,
                              hawkerReport.claimAmt
                            );
                          }}
                        >
                          Resolve
                        </Button>
                      ) : null}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>

        <h2 style={{ color: "#808080" }}>Transaction History</h2>
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
                Delivery on: {custOrder.deliveryDateTime}
              </h4>
              <h4 style={{ display: "flex" }}></h4>
              <h5 style={{ display: "flex" }}>Status: {this.orderState}</h5>

              {custOrder.state >= 2 && custOrder.state < 5 ? (
                <div>
                  <h5 style={{ display: "flex" }}>Rider: {custOrder.rider}</h5>
                </div>
              ) : null}

              {this.props.suppliers.map((hawker, key) => {
                if (hawker.owner == custOrder.seller) {
                  this.hawkerId = hawker.id;
                  return (
                    <div style={{ display: "flex" }}>
                      <h5>Ordered from: {this.state.supplierNames[key]}</h5>
                    </div>
                  );
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
                          {this.props.suppProducts[product.productId - 1].name}
                        </td>
                        <td>
                          {window.web3.utils.fromWei(
                            this.props.suppProducts[
                              product.productId - 1
                            ].price.toString(),
                            "Ether"
                          )}{" "}
                          Eth
                        </td>
                        <td>{product.productQty}</td>
                        <td>
                          {this.props.suppProducts[product.productId - 1]
                            .imageHash == "" ? (
                            <label>-</label>
                          ) : (
                            <img
                              height="70"
                              width="70"
                              alt="logo"
                              src={
                                "https://ipfs.infura.io/ipfs/" +
                                this.props.suppProducts[product.productId - 1]
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

export default Home;
