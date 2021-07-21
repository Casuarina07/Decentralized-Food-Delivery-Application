import React, { Component } from "react";
import { getCurrentDate } from "../utils/utils-date";
import { getCurrentTime } from "../utils/utils-time";

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
    if (this.props.custCart.length > 0) {
      return (
        <div style={{ margin: 60, marginTop: 20 }}>
          <h2>Cart</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Owner</th>
                <th scope="col">Image</th>
                <th scope="col"></th>
              </tr>
            </thead>
            {this.props.custCart.map((cart, key) => {
              return (
                <>
                  <tbody id="productList">
                    {this.props.restProducts.map((product, key) => {
                      if (product.id == cart) {
                        totalCost += +product.price;
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
                            <td>{product.owner}</td>
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
                            <td>
                              <button
                                onClick={(event) => {
                                  this.props.removeProdCart(
                                    this.props.custId,
                                    cart
                                  );
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
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            Order Amount:{" "}
            {window.web3.utils.fromWei(totalCost.toString(), "Ether")} Eth
          </div>
          {/* order is lesser than minimumOrder */}
          {window.web3.utils.fromWei(totalCost.toString(), "Ether") <
          minimumOrder ? (
            ((smallOrderFee = (
              minimumOrder -
              Number(window.web3.utils.fromWei(totalCost.toString(), "Ether"))
            ).toFixed(5)),
            (totalCost += Number(
              window.web3.utils.toWei(smallOrderFee.toString(), "Ether")
            )),
            (hawkerPayment = totalCost),
            (totalCost += Number(
              window.web3.utils.toWei(deliveryFee.toString(), "Ether")
            )),
            (riderPayment = Number(
              window.web3.utils.toWei(deliveryFee.toString(), "Ether")
            )),
            (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 5,
                }}
              >
                Small Order Fee: {smallOrderFee} Eth
              </div>
            ))
          ) : (
            <div style={{ display: "none" }}>
              {(hawkerPayment = totalCost)}
              {
                (totalCost += Number(
                  window.web3.utils.toWei(deliveryFee.toString(), "Ether")
                ))
              }
              {
                (riderPayment = Number(
                  window.web3.utils.toWei(deliveryFee.toString(), "Ether")
                ))
              }
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 5,
            }}
          >
            Delivery Fee: {deliveryFee} Eth ($3 SGD)
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
                console.log(seller);
                this.props.purchaseProduct(
                  this.props.custId,
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
                this.props.removeAllProdCart(this.props.custId);
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
