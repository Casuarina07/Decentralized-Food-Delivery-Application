import React, { Component } from "react";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNo: 0,
      itemCount: 0,
      orderState: 0,
      disable: false,
    };
  }

  render() {
    var counter = 1,
      counter2 = 1;
    var arrayCounter = 0,
      arrayCounter2 = 0;
    {
      this.props.fdDelivery.available
        ? (this.disable = false)
        : (this.disable = true);
    }
    return (
      <div style={{ margin: 60, marginTop: 20 }}>
        {console.log("Accepted Orders: ", this.props.fdAcceptedOrders)}

        {/* Accepted Orders */}
        {this.props.fdAcceptedOrders.length > 0 ? (
          <h2>Accepted orders</h2>
        ) : null}
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
              <h4 style={{ display: "flex" }}>
                Placed by: {fdAcceptedOrder.owner}
              </h4>

              <h4 style={{ display: "flex" }}>
                {fdAcceptedOrder.date} {fdAcceptedOrder.time}
              </h4>

              {this.props.hawkers.map((hawker, key) => {
                if (hawker.owner.toString() == fdAcceptedOrder.seller)
                  return (
                    <h5 style={{ display: "flex" }}>
                      Hawker Address: {hawker.addressLocation}
                    </h5>
                  );
              })}

              {this.props.customers.map((customer, key) => {
                if (customer.owner.toString() == fdAcceptedOrder.owner)
                  return (
                    <h5 style={{ display: "flex" }}>
                      Customer Address: {customer.addressLocation}
                    </h5>
                  );
              })}

              {fdAcceptedOrder.state == 2 ? (
                <button
                  style={{
                    display: "flex",
                    marginBottom: 10,
                  }}
                  onClick={(event) => {
                    this.props.fdCollectedOrder(fdAcceptedOrder.id);
                  }}
                >
                  Collected Order
                </button>
              ) : null}

              {fdAcceptedOrder.state == 3 ? (
                <button
                  style={{ display: "flex", marginBottom: 10 }}
                  onClick={(event) => {
                    this.props.fdCompleteOrder(fdAcceptedOrder.id);
                  }}
                >
                  Complete Order
                </button>
              ) : null}

              {fdAcceptedOrder.state == 4 ? (
                <button
                  style={{
                    display: "flex",
                    marginBottom: 10,
                    opacity: 0.6,
                    pointerEvents: "none",
                  }}
                >
                  Completed
                </button>
              ) : null}

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
                        <td>{product[0].name}</td>
                        <td>
                          {window.web3.utils.fromWei(
                            product[0].price.toString(),
                            "Ether"
                          )}{" "}
                          Eth
                        </td>
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

        {/* Not Accepted Orders */}
        {this.props.fdDeliveryOrders.length < 1 ? (
          <h2>No available orders</h2>
        ) : (
          <h2>Available Orders</h2>
        )}
        {this.props.fdDeliveryOrders.map((fdDeliveryOrder, key) => {
          this.orderNo = fdDeliveryOrder.id;
          this.itemCount = fdDeliveryOrder.purchasedItemCount;
          if (fdDeliveryOrder.state == 0) {
            this.orderState = "Order Placed";
          } else if (fdDeliveryOrder.state == 1) {
            this.orderState = "Finding Driver";
          } else if (fdDeliveryOrder.state == 2) {
            this.orderState = "Driver Confirmed";
          } else if (fdDeliveryOrder.state == 3) {
            this.orderState = "Order Collected";
          } else if (fdDeliveryOrder.state == 4) {
            this.orderState = "Order Completed";
          } else {
            this.orderState = "Order Cancelled";
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
              <h4 style={{ display: "flex" }}>
                Placed by: {fdDeliveryOrder.owner}
              </h4>

              <h4 style={{ display: "flex" }}>
                {fdDeliveryOrder.date} {fdDeliveryOrder.time}
              </h4>
              <h5 style={{ display: "flex" }}>Status: {this.orderState}</h5>
              {this.props.hawkers.map((hawker, key) => {
                if (hawker.owner.toString() == fdDeliveryOrder.seller)
                  return (
                    <h5 style={{ display: "flex" }}>
                      Hawker Address: {hawker.addressLocation}
                    </h5>
                  );
              })}

              {this.props.customers.map((customer, key) => {
                if (customer.owner.toString() == fdDeliveryOrder.owner)
                  return (
                    <h5 style={{ display: "flex" }}>
                      Customer Address: {customer.addressLocation}
                    </h5>
                  );
              })}
              <div style={{ display: "flex", marginBottom: 10 }}>
                {fdDeliveryOrder.state == 1 && this.disable == false ? (
                  <button
                    onClick={(event) => {
                      this.props.fdAcceptOrder(fdDeliveryOrder.id);
                    }}
                  >
                    Accept Order
                  </button>
                ) : (
                  <button
                    style={{ opacity: 0.6 }}
                    onClick={(event) => {
                      alert("Please start shift");
                    }}
                  >
                    Accept Order
                  </button>
                )}
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
                        <td>{product[0].name}</td>
                        <td>
                          {window.web3.utils.fromWei(
                            product[0].price.toString(),
                            "Ether"
                          )}{" "}
                          Eth
                        </td>
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
