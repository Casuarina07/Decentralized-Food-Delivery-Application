import React from "react";
import { Router } from "@reach/router";
import Home from "./Home";
import Orders from "./Orders";
import Purchase from "./Purchase";
import Profile from "./Profile";
import ResponsiveNavigation from "../ResponsiveNavigation";
import logo from "../logo.svg";
import "../Navbar.css";

function CustNavbar({
  account,
  loading,
  restProducts,
  restProdCount,
  purchaseProduct,
  hawkerName,
  hawkerAdd,
  hawkerOpeningHours,
  hawkerPhone,
}) {
  const navLinks = [
    {
      text: "Home",
      path: "/",
      icon: "ion-ios-home",
    },
    {
      text: "Purchase",
      path: "/purchase",
      icon: "ion-ios-megaphone",
    },
    {
      text: "Orders",
      path: "/orders",
      icon: "ion-ios-business",
    },
    {
      text: "Profile",
      path: "/profile",
      icon: "ion-ios-person",
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
        <Purchase
          path="/purchase"
          account={account}
          loading={loading}
          restProducts={restProducts}
          restProdCount={restProdCount}
          purchaseProduct={purchaseProduct}
        />
        <Home path="/" />
        <Orders path="/orders" />
        <Profile
          path="/profile"
          account={account}
          hawkerName={hawkerName}
          hawkerAdd={hawkerAdd}
          hawkerOpeningHours={hawkerOpeningHours}
          hawkerPhone={hawkerPhone}
        />
      </Router>
    </div>
  );
}
export default CustNavbar;
