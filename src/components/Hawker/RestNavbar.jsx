import React from "react";
import { Router } from "@reach/router";
import Home from "./Home";
import Orders from "./Orders";
import Purchase from "./Purchase";
import Sell from "./Sell";
import Profile from "./Profile";
import ResponsiveNavigation from "../ResponsiveNavigation";
// import logo from "../logo.svg";
import logo from "../logo.png";
import "../Navbar.css";
import SupplierInfo from "./SupplierInfo";
import Cart from "./Cart";
import ReportDetails from "../Customer/ReportDetails";

function RestNavbar({
  account,
  accBalance,
  loading,
  restProducts,
  restProdCount,
  suppProducts,
  suppProdCount,
  createProduct,
  purchaseProduct,
  editHawkerProfile,
  boolOpen,
  hawkerId,
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
  suppliers,
  addToCartHawker,
  hawkerCart,
  hawkerCartCount,
  custOrders,
  custOrderItems,
  orders,
  ordersItems,
  hawker,
  hawkerReports,
  resolveReport,
  hawkerOrderCount,
  hawkerCancellationCount,
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
    {
      text: "Cart",
      path: "/cart",
      icon: "ion-ios-cart",
      cartCount: "[" + hawkerCartCount + "]",
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
          hawkerId={hawkerId}
          loading={loading}
          restProducts={restProducts}
          restProdCount={restProdCount}
          suppProducts={suppProducts}
          suppProdCount={suppProdCount}
          purchaseProduct={purchaseProduct}
          suppliers={suppliers}
          addToCartHawker={addToCartHawker}
        />
        <SupplierInfo
          path="/supplierInfo/:id"
          suppliers={suppliers}
          // supp={hawkersCount}
          // hawkerFeedback={hawkerFeedback}
        />
        <Home
          path="/"
          restProducts={restProducts}
          account={account}
          custOrders={custOrders}
          custOrderItems={custOrderItems}
          suppProducts={suppProducts}
          suppliers={suppliers}
          orders={orders}
          hawkerReports={hawkerReports}
          resolveReport={resolveReport}
          loading={loading}
        />
        <Orders
          path="/orders"
          account={account}
          hawker={hawker}
          restProducts={restProducts}
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
          hawkerId={hawkerId}
          hawkerName={hawkerName}
          hawkerAdd={hawkerAdd}
          hawkerOpeningHours={hawkerOpeningHours}
          hawkerPhone={hawkerPhone}
          hawkerBoolOpen={hawkerBoolOpen}
          hawkerRating={hawkerRating}
          boolOpen={boolOpen}
          editHawkerProfile={editHawkerProfile}
          hawkerFeedback={hawkerFeedback}
          hawker={hawker}
          hawkerOrderCount={hawkerOrderCount}
          hawkerCancellationCount={hawkerCancellationCount}
        />
        <Cart
          path="/cart"
          hawkerId={hawkerId}
          hawkerCart={hawkerCart}
          suppProducts={suppProducts}
          purchaseProduct={purchaseProduct}
        />
        <ReportDetails
          path="/reportDetails/:id"
          custOrders={custOrders}
          custOrderItems={custOrderItems}
          restProducts={restProducts}
          orders={orders}
          ordersItems={ordersItems}
          hawkers={hawkers}
        />
      </Router>
    </div>
  );
}
export default RestNavbar;
