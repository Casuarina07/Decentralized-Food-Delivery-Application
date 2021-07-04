import React, { Component } from "react";
import "./Cust.css";
import { Link } from "@reach/router";

class Purchase extends Component {
  render() {
    return (
      <div style={{ margin: 60, marginTop: 20 }}>
        <h2>Purchase Food</h2>
        {this.props.hawkers.map((hawker, key) => {
          return (
            <>
              <h4 style={{ display: "flex" }}>
                <Link
                  to={`/hawkerInfo/${hawker.owner}`}
                  state={{ chosenHawkerPk: hawker.owner }}
                >
                  {hawker.name}
                </Link>
              </h4>

              <h5 style={{ display: "flex", color: "#808080" }}>
                {hawker.owner}
              </h5>

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Image</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody id="productList">
                  {this.props.restProducts.map((product, key) => {
                    if (product.owner == hawker.owner)
                      return (
                        <tr key={key}>
                          <th scope="row">{product.id.toString()}</th>
                          <td>{product.name}</td>
                          <td>
                            {window.web3.utils.fromWei(
                              product.price.toString(),
                              "Ether"
                            )}{" "}
                            Eth
                          </td>
                          {/* <td>
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
                          </td> */}
                          <td>
                            <button
                              name={product.id}
                              value={product.price}
                              onClick={(event) => {
                                //purchaseProduct(event.target.name, event.target.value);
                              }}
                            >
                              Add to Cart
                            </button>
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

export default Purchase;
