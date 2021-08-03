import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = { orderNo: 0, itemCount: 0, orderState: 0 };
  }

  render() {
    console.log(this.props.supplierOrderItems);
    console.log("Hawker orders: ", this.props.supplierOrders);
    var counter = 1;
    var arrayCounter = 0;
    return (
      <div style={{ margin: 60, marginTop: 20 }}>
        <h2>Transactions</h2>
        {this.props.supplierOrders.map((supplierOrder, key) => {
          this.orderNo = supplierOrder.id;
          this.itemCount = supplierOrder.purchasedItemCount;

          if (supplierOrder.state == 0) {
            this.orderState = "Order Placed";
          } else if (supplierOrder.state == 1) {
            this.orderState = "Finding Rider";
          } else if (supplierOrder.state == 2) {
            this.orderState = "Rider Confirmed";
          } else if (supplierOrder.state == 3) {
            this.orderState = "Rider Collected Food";
          } else if (supplierOrder.state == 4) {
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
              <h4 style={{ display: "flex" }}>{supplierOrder.owner}</h4>

              {/* <h4 style={{ display: "flex" }}>
                Ordered on: {supplierOrder.dateTime}
              </h4> */}

              <h4 style={{ display: "flex" }}>
                Delivery on: {supplierOrder.deliveryDateTime}
              </h4>

              <h5 style={{ display: "flex" }}>Status: {this.orderState}</h5>

              <div style={{ display: "flex", marginBottom: 10 }}>
                {supplierOrder.state == 0 ? (
                  <div>
                    <Button
                      variant="primary"
                      onClick={(event) => {
                        // this.props.hawkerConfirmOrder(supplierOrder.id);
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      style={{ marginLeft: 5 }}
                      variant="danger"
                      // onClick={(event) => {
                      //   this.props.cancelOrder(
                      //     supplierOrder.id,
                      //     supplierOrder.owner
                      //   );
                      // }}
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
                  {this.props.supplierOrderItems.map((product, key) => {
                    product = this.props.supplierOrderItems[arrayCounter];

                    if (counter >= this.itemCount) {
                      return;
                    }
                    if (arrayCounter >= this.props.supplierOrderItems.length) {
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
                              height="50"
                              width="120"
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
            </>
          );
        })}
      </div>
    );
  }
}

export default Orders;
