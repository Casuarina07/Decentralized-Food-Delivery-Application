import React, { Component } from "react";
import { getCurrentDate } from "../utils/utils-date";
import { getCurrentTime } from "../utils/utils-time";
import Card from "react-bootstrap/Card";

class Cart extends Component {
  constructor(props) {
    super(props);
  }

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
                              <button
                                onClick={(event) => {
                                  //   this.props.removeProdCart(
                                  //     this.props.custId,
                                  //     cart
                                  //   );
                                }}
                              >
                                Remove
                              </button>
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
            </Card>
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
            <button
              onClick={(event) => {
                var date = getCurrentDate();
                var time = getCurrentTime();
                console.log("Hawker ID: ", this.props.hawkerId);
                console.log("Seller Supplier ID: ", seller);
                console.log("hawkerPayment: ", hawkerPayment);
                console.log("riderPayment: ", riderPayment);
                console.log("TotalCost: ", totalCost);
                console.log("Date: ", date);
                console.log("Time: ", time);

                this.props.purchaseProduct(
                  2,
                  this.props.hawkerId,
                  seller,
                  hawkerPayment,
                  riderPayment,
                  totalCost,
                  date,
                  time
                );
              }}
            >
              Confirm Purchase
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={(event) => {
                this.props.removeAllProdCart(this.props.hawkerId, 2);
              }}
            >
              Remove All Products
            </button>
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
