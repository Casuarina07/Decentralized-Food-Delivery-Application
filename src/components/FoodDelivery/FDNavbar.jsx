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
  fdDelivery,
  boolWork,
  fdDeliveryOrders,
  fdOrderItems,
  fdAcceptOrder,
  fdAcceptedOrders,
  fdAcceptedOrderItems,
  fdCompleteOrder,
  customers,
  hawkers,
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
        // background="#fff"
        // hoverBackground="#ddd"
        // linkColor="#777"
      />
      <Router>
        <Home path="/" />
        <Orders
          path="/orders"
          account={account}
          fdDelivery={fdDelivery}
          fdDeliveryOrders={fdDeliveryOrders}
          fdOrderItems={fdOrderItems}
          fdAcceptOrder={fdAcceptOrder}
          fdAcceptedOrders={fdAcceptedOrders}
          fdAcceptedOrderItems={fdAcceptedOrderItems}
          fdCompleteOrder={fdCompleteOrder}
          customers={customers}
          hawkers={hawkers}
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
