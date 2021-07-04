import React from "react";
import { Router } from "@reach/router";
import Home from "./Home";
import Orders from "./Orders";
import Purchase from "./Purchase";
import Profile from "./Profile";
import HawkerInfo from "./HawkerInfo";
import Cart from "./Cart";
import ResponsiveNavigation from "../ResponsiveNavigation";
import logo from "../logo.svg";
import "../Navbar.css";

function CustNavbar({
  account,
  loading,
  restProducts,
  restProdCount,
  purchaseProduct,
  hawkers,
  hawkersCount,
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
    {
      text: "Cart",
      path: "/cart",
      icon: "ion-ios-cart",
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
          hawkers={hawkers}
          hawkersCount={hawkersCount}
        />
        <Home path="/" />
        <Orders path="/orders" />
        <Profile path="/profile" account={account} />
        <HawkerInfo
          path="/hawkerInfo/:id"
          hawkers={hawkers}
          hawkersCount={hawkersCount}
        />
        <Cart path="/cart" />
      </Router>
    </div>
  );
}
export default CustNavbar;
