import React from "react";
import { Router } from "@reach/router";
import Home from "./Home";
import Orders from "./Orders";
import Sell from "./Sell";
import Profile from "./Profile";
import ResponsiveNavigation from "../ResponsiveNavigation";
// import logo from "../logo.svg";
import logo from "../logo.png";
import "../Navbar.css";

function SuppNavbar({
  account,
  supplier,
  accBalance,
  loading,
  suppProducts,
  createSuppProduct,
  marketplace,
  pastEvents,
  editSupplierProfile,
  editSuppProduct,
  supplierOrders,
  supplierOrderItems,
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
      text: "Sell",
      path: "/sell",
      icon: "ion-ios-bonfire",
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
        <Home path="/" marketplace={marketplace} pastEvents={pastEvents} />

        <Orders
          path="/orders"
          supplierOrders={supplierOrders}
          suppProducts={suppProducts}
          supplierOrderItems={supplierOrderItems}
        />
        <Sell
          path="/sell"
          account={account}
          loading={loading}
          suppProducts={suppProducts}
          createSuppProduct={createSuppProduct}
          marketplace={marketplace}
          editSuppProduct={editSuppProduct}
        />
        <Profile
          path="/profile"
          account={account}
          supplier={supplier}
          editSupplierProfile={editSupplierProfile}
        />
      </Router>
    </div>
  );
}
export default SuppNavbar;
