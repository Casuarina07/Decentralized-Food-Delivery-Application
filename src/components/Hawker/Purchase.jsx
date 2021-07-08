import React, { Component } from "react";
import "./Rest.css";

class Purchase extends Component {
  render() {
    return (
      <div style={{ margin: 60, marginTop: 30 }}>
        <h2>Purchase Food Items</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            {this.props.suppProducts.map((product, key) => {
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
                  <td>{product.owner}</td>
                  <td>
                    <button
                      name={product.id}
                      value={product.price}
                      onClick={(event) => {
                        //purchaseProduct(event.target.name, event.target.value);
                      }}
                    >
                      Buy
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Purchase;
