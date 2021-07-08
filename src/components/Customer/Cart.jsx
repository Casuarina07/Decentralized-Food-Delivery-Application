import React, { Component } from "react";
import { getCurrentDate } from "../utils/utils-date";
import { getCurrentTime } from "../utils/utils-time";

class Cart extends Component {
  constructor(props) {
    super(props);
    //this.state = { totalCost: 0, imageHash: "" };
  }

  checkOut = (event) => {
    event.preventDefault();
  };

  render() {
    var totalCost = 0;
    var seller = "";
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
                              <text>-</text>
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
                              //name={product.id}
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
        <div>
          Total: {window.web3.utils.fromWei(totalCost.toString(), "Ether")} Eth
        </div>
        {this.props.custCart.length > 0 ? (
          <>
            <div>
              <button
                name={totalCost}
                onClick={(event) => {
                  console.log(getCurrentDate());
                  console.log(getCurrentTime());
                  console.log(seller);
                  //this.props.addToCart(event.target.name);
                }}
              >
                Confirm Purchase
              </button>
            </div>
            <div>
              <button
                name={this.props.custId}
                onClick={(event) => {
                  this.props.removeAllProdCart(event.target.name);
                }}
              >
                Remove All Products
              </button>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}

export default Cart;
