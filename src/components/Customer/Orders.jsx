import React, { Component } from "react";
import { BsConeStriped } from "react-icons/bs";
import "./Cust.css";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = { orderNo: 0, itemCount: 0, orderState: 0 };
  }

  render() {
    console.log(this.props.custOrderItems);
    var counter = 1;
    var arrayCounter = 0;
    return (
      <div style={{ margin: 60, marginTop: 20 }}>
        <h2>Ordered</h2>
        {this.props.custOrders.map((custOrder, key) => {
          this.orderNo = custOrder.id;
          this.itemCount = custOrder.purchasedItemCount;
          if (custOrder.state == 0) {
            this.orderState = "Order Placed";
          } else if (custOrder.state == 1) {
            this.orderState = "Finding Driver";
          } else if (custOrder.state == 2) {
            this.orderState = "Driver Confirmed";
          } else if (custOrder.state == 4) {
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
              <h4 style={{ display: "flex" }}>{custOrder.date}</h4>
              <h4 style={{ display: "flex" }}>{custOrder.time}</h4>
              <h4 style={{ display: "flex" }}>{this.orderState}</h4>

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
