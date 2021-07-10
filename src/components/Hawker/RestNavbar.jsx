import React from "react";
import { Router } from "@reach/router";
import Home from "./Home";
import Orders from "./Orders";
import Purchase from "./Purchase";
import Sell from "./Sell";
import Profile from "./Profile";
import ResponsiveNavigation from "../ResponsiveNavigation";
import logo from "../logo.svg";
import "../Navbar.css";

function RestNavbar({
  account,
  loading,
  restProducts,
  restProdCount,
  suppProducts,
  suppProdCount,
  createProduct,
  purchaseProduct,
  editHawkerProfile,
  boolOpen,
  hawkerName,
  hawkerAdd,
  hawkerOpeningHours,
  hawkerPhone,
  hawkerBoolOpen,
  hawkers,
  hawkerOrders,
  hawkerOrderItems,
  hawkerConfirmOrder,
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
      text: "Sell",
      path: "/sell",
      icon: "ion-ios-bonfire",
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
          suppProducts={suppProducts}
          suppProdCount={suppProdCount}
          purchaseProduct={purchaseProduct}
        />
        <Home path="/" />
        <Orders
          path="/orders"
          account={account}
          hawkerOrders={hawkerOrders}
          hawkerOrderItems={hawkerOrderItems}
          hawkerConfirmOrder={hawkerConfirmOrder}
        />
        <Sell
          path="/sell"
          account={account}
          loading={loading}
          restProducts={restProducts}
          restProdCount={restProdCount}
          suppProducts={suppProducts}
          suppProdCount={suppProdCount}
          createProduct={createProduct}
          purchaseProduct={purchaseProduct}
        />
        <Profile
          path="/profile"
          account={account}
          hawkers={hawkers}
          hawkerName={hawkerName}
          hawkerAdd={hawkerAdd}
          hawkerOpeningHours={hawkerOpeningHours}
          hawkerPhone={hawkerPhone}
          hawkerBoolOpen={hawkerBoolOpen}
          boolOpen={boolOpen}
          editHawkerProfile={editHawkerProfile}
        />
      </Router>
    </div>
  );
}
export default RestNavbar;
