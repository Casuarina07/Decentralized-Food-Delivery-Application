import React, { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";
import { BrowserRouter as Router } from "react-router-dom";
import SuppNav from "./Supplier/SuppNavbar";
import RestNavbar from "./Hawker/RestNavbar";
import CustNavbar from "./Customer/CustNavbar";
import FDNavbar from "./FoodDelivery/FDNavbar";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState("");
  const [productCount, setProductCount] = useState(0);
  const [marketplace, setMarketPlace] = useState({});
  const [restProducts, setRestProducts] = useState([]);
  const [restProdCount, setRestProdCount] = useState(0);
  const [suppProducts, setSuppProducts] = useState([]);
  const [suppProdCount, setSuppProdCount] = useState(0);
  const [hawkersPublicKey, setHawkersPublicKey] = useState([
    "0x73c005D4B234C63F416F6e1038C011D55edDBF1e",
    "0x87ECEE1454A7b32253A9020F6ae1FF25e9CE35B5",
  ]);
  const [custsPublicKey, setCustsPublicKey] = useState([
    "0xC9342f12d49ca9e40d600eBF17266DcCc88a0639",
    "0x7C2eA58a210F8e7c80fdeB6788C1D5Fc4a3E73ba",
  ]);
  const [fdsPublicKey, setFDsPublicKey] = useState([
    "0x66f8f66996aaB36b041b1cAdA9f20864a0C42698",
  ]);
  const [suppliersPublicKey, setSuppliersPublicKey] = useState([
    "0x09Df3eb010bF64141C020b2f98d521916dF2F9a8",
  ]);
  const [custAcc, setCustAcc] = useState(false);
  const [hawkerAcc, setHawkerAcc] = useState(false);
  const [supplierAcc, setSupplierAcc] = useState(false);
  const [fdAcc, setFDAcc] = useState(false);

  //hawker-details
  const [hawkerName, setHawkerName] = useState("");
  const [hawkerAdd, setHawkerAdd] = useState("");
  const [hawkerOpeningHours, setHawkerOpeningHours] = useState("");
  const [hawkerPhone, setHawkerPhone] = useState("");
  const [hawkerBoolOpen, setHawkerBoolOpen] = useState(false);
  const [hawkerRating, setHawkerRating] = useState(0);
  const [hawkersCount, setHawkersCount] = useState(0);
  const [hawkers, setHawkers] = useState([]);
  const [hawkerOrders, setHawkerOrders] = useState([]);
  const [hawkerOrderItems, setHawkerOrderItems] = useState([]);
  const [hawkerFeedback, setHawkerFeedback] = useState([]);

  //customer-details
  const [custId, setCustId] = useState(0);
  const [custName, setCustName] = useState("");
  const [custAdd, setCustAdd] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [custCart, setCustCart] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [custCount, setCustCount] = useState(0);
  const [custOrders, setCustOrders] = useState([]);
  const [custOrderItems, setCustOrderItems] = useState([]);

  //order-details
  const [orders, setOrders] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);

  //food-delivery
  const [foodDeliveries, setFoodDeliveries] = useState([]);
  const [fdCount, setFDCount] = useState(0);
  const [fdDelivery, setFDDelivery] = useState([]);
  const [fdDeliveryOrders, setFDDeliveryOrders] = useState([]);
  const [fdOrderItems, setFDOrderItems] = useState([]);
  const [fdAcceptedOrders, setFDAcceptedOrders] = useState([]);
  const [fdAcceptedOrderItems, setFDAcceptedOrderItems] = useState([]);

  const [pastEvents, setPastEvents] = useState([]);

  //acount-details
  // const suppPublicKey = "0x09Df3eb010bF64141C020b2f98d521916dF2F9a8";

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    //Load account
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    console.log("Account: ", accounts);

    const networkId = await web3.eth.net.getId(); //5777
    const networkData = Marketplace.networks[networkId];
    if (networkData) {
      const marketplace = new web3.eth.Contract(
        Marketplace.abi,
        networkData.address
      );
      setMarketPlace(marketplace);

      //FETCH RESTAURANT PRODUCTS
      const restProdCount = await marketplace.methods.restProdCount().call();
      setRestProdCount(restProdCount);
      console.log("Rest Products: " + restProdCount);
      for (var k = 1; k <= restProdCount; k++) {
        const restProduct = await marketplace.methods.restProducts(k).call();
        setRestProducts((restProducts) => [...restProducts, restProduct]);
      }

      //FETCH SUPPLIER PRODUCTS
      const suppProductCount = await marketplace.methods.suppProdCount().call();
      setSuppProdCount(suppProductCount);
      console.log("Supplier Products: " + suppProductCount);
      for (var k = 1; k <= suppProductCount; k++) {
        const suppProduct = await marketplace.methods.suppProducts(k).call();
        setSuppProducts((suppProducts) => [...suppProducts, suppProduct]);
      }

      //FETCH HAWKERS
      const hawkersCount = await marketplace.methods.hawkersCount().call();
      setHawkersCount(hawkersCount);
      for (var j = 1; j <= hawkersCount; j++) {
        const hawker = await marketplace.methods.hawkers(j).call();
        setHawkers((hawkers) => [...hawkers, hawker]);
        if (hawker.owner.toString() === accounts.toString()) {
          console.log("Hawker Account");
          setHawkerName(hawker.name);
          setHawkerAdd(hawker.addressLocation);
          setHawkerOpeningHours(hawker.openingHours);
          setHawkerPhone(hawker.phone);
          setHawkerBoolOpen(hawker.open);
          setHawkerRating(hawker.avgRating);
        }
        for (var k = 1; k <= hawker.feedbackCount; k++) {
          const prodId = await marketplace.methods
            .getHawkerFeedback(hawker.id, k)
            .call();
          setHawkerFeedback((hawkerFeedback) => [...hawkerFeedback, prodId]);
        }
      }

      //FETCH CUSTOMERS
      const customersCount = await marketplace.methods.customersCount().call();
      setCustCount(customersCount);
      for (var l = 1; l <= customersCount; l++) {
        const cust = await marketplace.methods.customers(l).call();
        setCustomers((customers) => [...customers, cust]);
        if (cust.owner.toString() === accounts.toString()) {
          console.log("Customer Account: ", cust.name);
          setCustId(cust.id);
          setCustName(cust.name);
          setCustAdd(cust.addressLocation);
          setCustPhone(cust.phone);
          setCartCount(cust.itemCount);

          //fetch cart products
          for (var k = 1; k <= cust.itemCount; k++) {
            const prodId = await marketplace.methods
              .getCartProduct(cust.id, k)
              .call();
            setCustCart((custCart) => [...custCart, prodId]);
          }
        }
      }

      //FETCH ORDERS
      const ordersCount = await marketplace.methods.ordersCount().call();
      setOrdersCount(ordersCount);
      console.log("Orders Count: ", ordersCount);

      for (var l = 1; l <= ordersCount; l++) {
        const order = await marketplace.methods.orders(l).call();
        setOrders((orders) => [...orders, order]);
        if (order.owner.toString() === accounts.toString()) {
          setCustOrders((custOrders) => [...custOrders, order]);
          //get the item that the order consists
          for (var k = 1; k <= order.purchasedItemCount; k++) {
            const prodId = await marketplace.methods
              .getOrderProduct(order.id, k)
              .call();
            setCustOrderItems((custOrderItems) => [...custOrderItems, prodId]);
          }
        }
        // order inventory for each hawker
        if (order.seller.toString() === accounts.toString()) {
          setHawkerOrders((hawkerOrders) => [...hawkerOrders, order]);
          //get the item that the order consists
          for (var k = 1; k <= order.purchasedItemCount; k++) {
            const prodId = await marketplace.methods
              .getOrderProduct(order.id, k)
              .call();
            setHawkerOrderItems((hawkerOrderItems) => [
              ...hawkerOrderItems,
              prodId,
            ]);
          }
        }

        // orders inventory for food delivery - state.OrderConfirm
        if (order.state == 1) {
          setFDDeliveryOrders((fdDeliveryOrders) => [
            ...fdDeliveryOrders,
            order,
          ]);
          for (var k = 1; k <= order.purchasedItemCount; k++) {
            const prodId = await marketplace.methods
              .getOrderProduct(order.id, k)
              .call();
            setFDOrderItems((fdOrderItems) => [...fdOrderItems, prodId]);
          }
        }

        //fetch accepted orders
        if (
          order.state >= 2 &&
          order.driver.toString() == accounts.toString()
        ) {
          console.log("Hello");
          setFDAcceptedOrders((fdAcceptedOrders) => [
            ...fdAcceptedOrders,
            order,
          ]);

          for (var k = 1; k <= order.purchasedItemCount; k++) {
            const prodId = await marketplace.methods
              .getOrderProduct(order.id, k)
              .call();
            setFDAcceptedOrderItems((fdAcceptedOrderItems) => [
              ...fdAcceptedOrderItems,
              prodId,
            ]);
          }
        }
      }

      //FETCH FOOD DELIVERY
      const fdCount = await marketplace.methods.foodDeliveriesCount().call();
      setFDCount(fdCount);
      for (var j = 1; j <= fdCount; j++) {
        const foodDelivery = await marketplace.methods.foodDeliveries(j).call();
        setFoodDeliveries((foodDelivery) => [...foodDeliveries, foodDelivery]);
        if (foodDelivery.owner.toString() === accounts.toString()) {
          setFDDelivery(foodDelivery);
        }
      }

      //get all previous events
      marketplace.getPastEvents(
        "RestProdCreated",
        {
          // filter: { owner: accounts },
          fromBlock: 0,
          toBlock: "latest",
        },
        (errors, results) => {
          if (!errors) {
            console.log("Rest Prod Created results: ", results);
            setPastEvents(results);
          }
        }
      );

      // check if customer, hawkers, suppliers or fooddelivery (fd)
      for (var i = 0; i < custsPublicKey.length; i++) {
        if (accounts.toString() === custsPublicKey[i]) {
          setCustAcc(true);
          return;
        }
      }
      for (var i = 0; i < hawkersPublicKey.length; i++) {
        if (accounts.toString() === hawkersPublicKey[i]) {
          setHawkerAcc(true);
          return;
        }
      }
      for (var i = 0; i < fdsPublicKey.length; i++) {
        if (accounts.toString() === fdsPublicKey[i]) {
          setFDAcc(true);
          return;
        }
      }
      for (var i = 0; i < suppliersPublicKey.length; i++) {
        if (accounts.toString() === suppliersPublicKey[i]) {
          setSupplierAcc(true);
          return;
        }
      }
      setLoading(false);
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  }

  const removeProdCart = (custId, cartId) => {
    setLoading(true);
    marketplace.methods
      .removeProdCart(custId, cartId)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Successfully Removed");
        window.location.reload();
        setLoading(false);
      });
  };

  const removeAllProdCart = (custId) => {
    setLoading(true);
    marketplace.methods
      .removeAllProdCart(custId)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Successfully Removed All Products");
        window.location.reload();
        setLoading(false);
      });
  };

  const editHawkerProfile = (phone, openingHours) => {
    setLoading(true);
    marketplace.methods
      .editHawkerProfile(phone, openingHours)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Successfully Changed");
        window.location.reload();
        setLoading(false);
      });
  };

  const boolOpen = () => {
    setLoading(true);
    marketplace.methods
      .boolOpen()
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Shop status changed");
        window.location.reload();
        setLoading(false);
      });
  };

  const boolWork = () => {
    setLoading(true);
    marketplace.methods
      .boolWork()
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Status changed");
        window.location.reload();
        setLoading(false);
      });
  };

  const editCustProfile = (phone, address) => {
    setLoading(true);
    marketplace.methods
      .editCustProfile(phone, address)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Successfully Changed");
        window.location.reload();
        setLoading(false);
      });
  };

  const addToCart = (id) => {
    setLoading(true);
    marketplace.methods
      .addToCart(id)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Successfully Added");
        window.location.reload();
        setLoading(false);
      });
  };

  const hawkerConfirmOrder = (orderId) => {
    setLoading(true);
    marketplace.methods
      .hawkerConfirmOrder(orderId)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Transaction confirmed");
        window.location.reload();
        setLoading(false);
      });
  };

  const fdAcceptOrder = (orderId) => {
    setLoading(true);
    marketplace.methods
      .fdAcceptOrder(orderId)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Order accepted");
        window.location.reload();
        setLoading(false);
      });
  };

  const fdCompleteOrder = (orderId) => {
    setLoading(true);
    marketplace.methods
      .fdCompleteOrder(orderId)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Order completed");
        window.location.reload();
        setLoading(false);
      });
  };

  const setRating = (
    orderId,
    hawkerAdd,
    hawkerRate,
    hawkerComment,
    fdAdd,
    fdRate,
    fdComment
  ) => {
    setLoading(true);
    marketplace.methods
      .setRating(
        orderId,
        hawkerAdd,
        hawkerRate,
        hawkerComment,
        fdAdd,
        fdRate,
        fdComment
      )
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Thank you for your feedback! ");
        window.location.reload();
        setLoading(false);
      });
  };

  const createRestProduct = (name, price, published, imageHash) => {
    setLoading(true);
    marketplace.methods
      .createRestProduct(name, price, published, imageHash)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Successfully created");
        window.location.reload();
        setLoading(false);
      });
  };

  const createSuppProduct = (name, price, published, imageHash) => {
    setLoading(true);
    marketplace.methods
      .createSuppProduct(name, price, published, imageHash)
      .send({ from: account })
      .once("receipt", (receipt) => {
        // console.log(
        //   "TEST!!!!!! ",
        //   createSuppProduct.events.SupplierProdCreated
        // );
        //console.log("TEST!!!!!! ", createSuppProduct.events);
        alert("Successfully created");
        window.location.reload();
        setLoading(false);
      });
  };

  const purchaseProduct = (
    custId,
    seller,
    hawkerPayment,
    riderPayment,
    totalCost,
    date,
    time
  ) => {
    setLoading(true);
    marketplace.methods
      .purchaseProduct(
        custId,
        seller,
        hawkerPayment,
        riderPayment,
        totalCost,
        date,
        time
      )
      .send({ from: account, value: totalCost })
      .once("receipt", (receipt) => {
        alert("Successfully Purchased");
        window.location.reload();
        setLoading(false);
      });
  };

  const editProduct = (productId, name, price, imageHash, published) => {
    setLoading(true);
    marketplace.methods
      .editProduct(productId, name, price, imageHash, published)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Successfully changed");
        window.location.reload();
        setLoading(false);
      });
  };

  const deleteProduct = (productId) => {
    setLoading(true);
    marketplace.methods
      .deleteProduct(productId)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Successfully deleted");
        window.location.reload();
        setLoading(false);
      });
  };

  const cancelOrder = (orderId, custAddress) => {
    setLoading(true);
    marketplace.methods
      .cancelOrder(orderId, custAddress)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Order Cancelled");
        window.location.reload();
        setLoading(false);
      });
  };

  return (
    <div>
      <Router>
        {supplierAcc ? (
          <SuppNav
            account={account}
            loading={loading}
            productCount={productCount}
            createSuppProduct={createSuppProduct}
            suppProducts={suppProducts}
            marketplace={marketplace}
            pastEvents={pastEvents}
          />
        ) : null}
        {hawkerAcc ? (
          <RestNavbar
            account={account}
            loading={loading}
            restProducts={restProducts}
            restProdCount={restProdCount}
            suppProducts={suppProducts}
            suppProdCount={suppProdCount}
            createProduct={createRestProduct}
            purchaseProduct={purchaseProduct}
            editHawkerProfile={editHawkerProfile}
            boolOpen={boolOpen}
            hawkerName={hawkerName}
            hawkerAdd={hawkerAdd}
            hawkerOpeningHours={hawkerOpeningHours}
            hawkerPhone={hawkerPhone}
            hawkerBoolOpen={hawkerBoolOpen}
            hawkerRating={hawkerRating}
            hawkerFeedback={hawkerFeedback}
            hawkerOrders={hawkerOrders}
            hawkerOrderItems={hawkerOrderItems}
            hawkerConfirmOrder={hawkerConfirmOrder}
            editProduct={editProduct}
            deleteProduct={deleteProduct}
            cancelOrder={cancelOrder}
          />
        ) : null}
        {custAcc ? (
          <CustNavbar
            account={account}
            loading={loading}
            restProducts={restProducts}
            restProdCount={restProdCount}
            purchaseProduct={purchaseProduct}
            hawkers={hawkers}
            hawkersCount={hawkersCount}
            custId={custId}
            custName={custName}
            custAdd={custAdd}
            custPhone={custPhone}
            custCart={custCart}
            cartCount={cartCount}
            editCustProfile={editCustProfile}
            addToCart={addToCart}
            removeProdCart={removeProdCart}
            removeAllProdCart={removeAllProdCart}
            purchaseProduct={purchaseProduct}
            custOrders={custOrders}
            custOrderItems={custOrderItems}
            setRating={setRating}
            hawkerFeedback={hawkerFeedback}
            cancelOrder={cancelOrder}
          />
        ) : null}
        {fdAcc ? (
          <FDNavbar
            account={account}
            customers={customers}
            hawkers={hawkers}
            custOrders={custOrders}
            fdDelivery={fdDelivery}
            boolWork={boolWork}
            fdDeliveryOrders={fdDeliveryOrders}
            fdOrderItems={fdOrderItems}
            fdAcceptOrder={fdAcceptOrder}
            fdAcceptedOrders={fdAcceptedOrders}
            fdAcceptedOrderItems={fdAcceptedOrderItems}
            fdCompleteOrder={fdCompleteOrder}
          />
        ) : null}
      </Router>
    </div>
  );
}
