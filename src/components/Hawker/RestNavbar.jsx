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
  hawkerRating,
  hawkers,
  hawkerOrders,
  hawkerOrderItems,
  hawkerConfirmOrder,
  hawkerFeedback,
  editProduct,
  deleteProduct,
  cancelOrder,
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
      icon: "ion-ios-card",
    },
    {
      text: "Orders",
      path: "/orders",
      icon: "ion-ios-list",
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
          cancelOrder={cancelOrder}
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
          editProduct={editProduct}
          deleteProduct={deleteProduct}
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
          hawkerRating={hawkerRating}
          boolOpen={boolOpen}
          editHawkerProfile={editHawkerProfile}
          hawkerFeedback={hawkerFeedback}
        />
      </Router>
    </div>
  );
}
export default RestNavbar;
