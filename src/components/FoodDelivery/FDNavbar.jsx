import React from "react";
import { Router } from "@reach/router";
import Home from "./Home";
import Orders from "./Orders";
import Profile from "./Profile";
import ResponsiveNavigation from "../ResponsiveNavigation";
import logo from "../logo.svg";
import "../Navbar.css";

function FDNavbar({
  account,
  accBalance,
  fdDelivery,
  boolWork,
  fdDeliveryOrders,
  fdOrderItems,
  fdAcceptOrder,
  fdAcceptedOrders,
  fdAcceptedOrderItems,
  fdCollectedOrder,
  fdCompleteOrder,
  customers,
  hawkers,
  restProducts,
  fdCompletedOrders,
  fdCompletedOrderItems,
  fdOngoingOrders,
  fdOngoingOrderItems,
}) {
  const navLinks = [
    {
      text: "Home",
      path: "/",
      icon: "ion-ios-home",
    },
    {
      text: "Orders",
      path: "/orders",
      icon: "ion-ios-business",
    },
    {
      text: "Profile",
      path: "/profile",
      icon: "ion-ios-business",
    },
  ];

  return (
    <div className="App">
      <ResponsiveNavigation
        navLinks={navLinks}
        logo={logo}
        account={account}
        accBalance={accBalance}
        // background="#fff"
        // hoverBackground="#ddd"
        // linkColor="#777"
      />
      <Router>
        <Home path="/" />
        <Orders
          path="/orders"
          account={account}
          restProducts={restProducts}
          fdDelivery={fdDelivery}
          fdDeliveryOrders={fdDeliveryOrders}
          fdOrderItems={fdOrderItems}
          fdAcceptOrder={fdAcceptOrder}
          fdAcceptedOrders={fdAcceptedOrders}
          fdAcceptedOrderItems={fdAcceptedOrderItems}
          fdCollectedOrder={fdCollectedOrder}
          fdCompleteOrder={fdCompleteOrder}
          customers={customers}
          hawkers={hawkers}
          fdCompletedOrders={fdCompletedOrders}
          fdCompletedOrderItems={fdCompletedOrderItems}
          fdOngoingOrders={fdOngoingOrders}
          fdOngoingOrderItems={fdOngoingOrderItems}
        />
        <Profile
          path="/profile"
          account={account}
          fdDelivery={fdDelivery}
          boolWork={boolWork}
          fdAcceptedOrders={fdAcceptedOrders}
        />
      </Router>
    </div>
  );
}
export default FDNavbar;
