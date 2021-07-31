import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = { orderNo: 0, itemCount: 0, orderState: 0 };
  }

  render() {
    console.log(this.props.hawkerOrderItems);
    console.log("Hawker orders: ", this.props.hawkerOrders);
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
                {hawkerOrder.date} {hawkerOrder.time}
              </h4>

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
                      variant="primary"
                      onClick={(event) => {
                        this.props.hawkerConfirmOrder(hawkerOrder.id);
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      style={{ marginLeft: 5 }}
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
                        <td>{product[0].name}</td>
                        <td>
                          {window.web3.utils.fromWei(
                            product[0].price.toString(),
                            "Ether"
                          )}{" "}
                          Eth
                        </td>
                        <td>{product[1].productQty}</td>
                        <td>
                          {product[0].imageHash == "" ? (
                            <label>-</label>
                          ) : (
                            <img
                              height="50"
                              width="120"
                              alt="logo"
                              src={
                                "https://ipfs.infura.io/ipfs/" +
                                product[0].imageHash
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
