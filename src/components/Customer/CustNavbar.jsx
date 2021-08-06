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
  accBalance,
  loading,
  restProducts,
  restProdCount,
  hawkers,
  hawkersCount,
  custId,
  custName,
  custAdd,
  custPhone,
  custCart,
  cartCount,
  editCustProfile,
  addToCart,
  removeProdCart,
  removeAllProdCart,
  purchaseProduct,
  custOrders,
  custOrderItems,
  setRating,
  hawkerFeedback,
  cancelOrder,
  foodDeliveries,
  createReport,
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
      cartCount: "[" + cartCount + "]",
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
        <Purchase
          path="/purchase"
          account={account}
          loading={loading}
          restProducts={restProducts}
          restProdCount={restProdCount}
          purchaseProduct={purchaseProduct}
          hawkers={hawkers}
          hawkersCount={hawkersCount}
          addToCart={addToCart}
          custId={custId}
        />
        <Home path="/" />
        <Orders
          path="/orders"
          custOrders={custOrders}
          custOrderItems={custOrderItems}
          restProducts={restProducts}
          hawkers={hawkers}
          setRating={setRating}
          cancelOrder={cancelOrder}
          foodDeliveries={foodDeliveries}
          createReport={createReport}
        />
        <Profile
          path="/profile"
          custId={custId}
          account={account}
          custName={custName}
          custAdd={custAdd}
          custPhone={custPhone}
          editCustProfile={editCustProfile}
        />
        <HawkerInfo
          path="/hawkerInfo/:id"
          hawkers={hawkers}
          hawkersCount={hawkersCount}
          hawkerFeedback={hawkerFeedback}
        />
        <Cart
          path="/cart"
          custCart={custCart}
          restProducts={restProducts}
          removeProdCart={removeProdCart}
          custId={custId}
          removeAllProdCart={removeAllProdCart}
          purchaseProduct={purchaseProduct}
        />
      </Router>
    </div>
  );
}
export default CustNavbar;
