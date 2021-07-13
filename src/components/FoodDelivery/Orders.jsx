import React, { Component } from "react";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = { orderNo: 0, itemCount: 0, orderState: 0 };
  }

  render() {
    var counter = 1,
      counter2 = 1;
    var arrayCounter = 0,
      arrayCounter2 = 0;
    return (
      <div style={{ margin: 60, marginTop: 20 }}>
        {console.log("Accepted Orders: ", this.props.fdAcceptedOrders)}

        {/* Accepted Orders */}
        <h2>Accepted Orders</h2>
        {this.props.fdAcceptedOrders.map((fdAcceptedOrder, key) => {
          this.orderNo = fdAcceptedOrder.id;
          this.itemCount = fdAcceptedOrder.purchasedItemCount;
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
              <h4 style={{ display: "flex" }}>{fdAcceptedOrder.owner}</h4>

              <h4 style={{ display: "flex" }}>
                {fdAcceptedOrder.date} {fdAcceptedOrder.time}
              </h4>

              <button
                style={{ display: "flex", marginBottom: 10 }}
                onClick={(event) => {
                  this.props.fdCompleteOrder(fdAcceptedOrder.id);
                }}
              >
                Complete Order
              </button>

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
                  {this.props.fdAcceptedOrderItems.map((product, key) => {
                    product = this.props.fdAcceptedOrderItems[arrayCounter];

                    if (counter >= this.itemCount) {
                      return;
                    }
                    if (
                      arrayCounter >= this.props.fdAcceptedOrderItems.length
                    ) {
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

        {/* Not Accepted Orders */}
        <h2>Other Orders</h2>
        {this.props.fdDeliveryOrders.map((fdDeliveryOrder, key) => {
          this.orderNo = fdDeliveryOrder.id;
          this.itemCount = fdDeliveryOrder.purchasedItemCount;
          if (fdDeliveryOrder.state == 0) {
            this.orderState = "Order Placed";
          } else if (fdDeliveryOrder.state == 1) {
            this.orderState = "Finding Driver";
          } else if (fdDeliveryOrder.state == 2) {
            this.orderState = "Driver Confirmed";
          } else if (fdDeliveryOrder.state == 4) {
            this.orderState = "In Transit";
          } else {
            this.orderState = "Order Completed";
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
              <h4 style={{ display: "flex" }}>{fdDeliveryOrder.owner}</h4>

              <h4 style={{ display: "flex" }}>
                {fdDeliveryOrder.date} {fdDeliveryOrder.time}
              </h4>
              <h5 style={{ display: "flex" }}>Status: {this.orderState}</h5>
              <div style={{ display: "flex", marginBottom: 10 }}>
                {fdDeliveryOrder.state == 1 ? (
                  <button
                    onClick={(event) => {
                      this.props.fdAcceptOrder(fdDeliveryOrder.id);
                    }}
                  >
                    Accept Order
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
