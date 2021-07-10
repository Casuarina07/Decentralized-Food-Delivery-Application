import React, { Component } from "react";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = { orderNo: 0, itemCount: 0, orderState: 0 };
  }

  render() {
    console.log(this.props.hawkerOrderItems);
    var counter = 1;
    var arrayCounter = 0;
    return (
      <div style={{ margin: 60, marginTop: 20 }}>
        <h2>Transactions</h2>
        {this.props.hawkerOrders.map((hawkerOrder, key) => {
          this.orderNo = hawkerOrder.id;
          this.itemCount = hawkerOrder.purchasedItemCount;
          if (hawkerOrder.state == 0) {
            this.orderState = "Order Placed";
          } else if (hawkerOrder.state == 1) {
            this.orderState = "Finding Driver";
          } else if (hawkerOrder.state == 2) {
            this.orderState = "Driver Confirmed";
          } else if (hawkerOrder.state == 4) {
            this.orderState = "In Transit";
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
              <h4 style={{ display: "flex" }}>{hawkerOrder.owner}</h4>

              <h4 style={{ display: "flex" }}>
                {hawkerOrder.date} {hawkerOrder.time}
              </h4>
              <h5 style={{ display: "flex" }}>Status: {this.orderState}</h5>
              <div style={{ display: "flex", marginBottom: 10 }}>
                {hawkerOrder.state == 0 ? (
                  <button
                    onClick={(event) => {
                      this.props.hawkerConfirmOrder(hawkerOrder.id);
                    }}
                  >
                    Confirm Order
                  </button>
                ) : null}
              </div>

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
