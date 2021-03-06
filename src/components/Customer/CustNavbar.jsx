import React from "react";
import { Router } from "@reach/router";
import Home from "./Home";
import Orders from "./Orders";
import Purchase from "./Purchase";
import Profile from "./Profile";
import HawkerInfo from "./HawkerInfo";
import Cart from "./Cart";
import ReportList from "./ReportList";
import ReportDetails from "./ReportDetails";
import ResponsiveNavigation from "../ResponsiveNavigation";
// import logo from "../logo.svg";
import logo from "../logo.png";

import "../Navbar.css";

function CustNavbar({
  account,
  accBalance,
  loading,
  restProducts,
  restProdCount,
  hawkers,
  hawkersCount,
  customer,
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
  custReports,
  reportsIssued,
  orders,
  ordersItems,
  addApprovalCount,
  addRejectionCount,
  claimReturns,
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
        clickedTab="#FFF"
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
        <Home
          path="/"
          account={account}
          reportsIssued={reportsIssued}
          addApprovalCount={addApprovalCount}
          addRejectionCount={addRejectionCount}
        />
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
          reportsIssued={reportsIssued}
        />
        <Profile
          path="/profile"
          custId={custId}
          account={account}
          customer={customer}
          custName={custName}
          custAdd={custAdd}
          custPhone={custPhone}
          editCustProfile={editCustProfile}
          custReports={custReports}
        />
        <HawkerInfo
          path="/hawkerInfo/:id"
          hawkers={hawkers}
          hawkersCount={hawkersCount}
          hawkerFeedback={hawkerFeedback}
        />
        <ReportList path="/reports" />
        <ReportDetails
          path="/reportDetails/:id"
          custOrders={custOrders}
          custOrderItems={custOrderItems}
          restProducts={restProducts}
          orders={orders}
          ordersItems={ordersItems}
          hawkers={hawkers}
          claimReturns={claimReturns}
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
