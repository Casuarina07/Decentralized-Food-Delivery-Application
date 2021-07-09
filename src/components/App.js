import React, { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";
import { BrowserRouter as Router } from "react-router-dom";
import SuppNav from "./Supplier/SuppNavbar";
import RestNavbar from "./Hawker/RestNavbar";
import CustNavbar from "./Customer/CustNavbar";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState("");
  const [productCount, setProductCount] = useState(0);
  const [marketplace, setMarketPlace] = useState({});
  const [suppProducts, setSuppProducts] = useState([]);
  const [suppProdCount, setSuppProdCount] = useState(0);
  const [restProducts, setRestProducts] = useState([]);
  const [restProdCount, setRestProdCount] = useState(0);
  const [hawkersPublicKey, setHawkersPublicKey] = useState([
    "0x73c005D4B234C63F416F6e1038C011D55edDBF1e",
    "0x87ECEE1454A7b32253A9020F6ae1FF25e9CE35B5",
  ]);

  //hawker-details
  const [hawkerName, setHawkerName] = useState("");
  const [hawkerAdd, setHawkerAdd] = useState("");
  const [hawkerOpeningHours, setHawkerOpeningHours] = useState("");
  const [hawkerPhone, setHawkerPhone] = useState("");
  const [hawkerBoolOpen, setHawkerBoolOpen] = useState(false);
  const [hawkersCount, setHawkersCount] = useState(0);
  const [hawkers, setHawkers] = useState([]);

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

  //acount-details
  const restPublicKey = "0x73c005D4B234C63F416F6e1038C011D55edDBF1e";
  const suppPublicKey = "0x09Df3eb010bF64141C020b2f98d521916dF2F9a8";
  const custPublicKey = "0xC9342f12d49ca9e40d600eBF17266DcCc88a0639";

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

      //FETCH SUPPLIER PRODUCTS
      const suppProdCount = await marketplace.methods.suppProdCount().call();
      setSuppProdCount(suppProdCount);
      console.log("Number of products: " + suppProdCount);
      for (var i = 1; i <= suppProdCount; i++) {
        const suppProduct = await marketplace.methods.suppProducts(i).call();
        setSuppProducts((suppProducts) => [...suppProducts, suppProduct]);
      }
      console.log("Account Number: " + account);
      console.log("Product: " + suppProducts);
      console.log("Loading: " + loading.toString());

      //FETCH RESTAURANT PRODUCTS
      const restProdCount = await marketplace.methods.restProdCount().call();
      setRestProdCount(restProdCount);
      console.log("Rest Products: " + restProdCount);
      for (var k = 1; k <= restProdCount; k++) {
        const restProduct = await marketplace.methods.restProducts(k).call();
        console.log("Rest Product Hash: ", restProduct.imageHash);
        setRestProducts((restProducts) => [...restProducts, restProduct]);
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
          //console.log("TESTING: ", order.purchasedItemId(0));
          //get the item that the order consists
          for (var k = 1; k <= order.purchasedItemCount; k++) {
            const prodId = await marketplace.methods
              .getOrderProduct(order.id, k)
              .call();
            console.log("ProdId in cart: ", prodId);
            setCustOrderItems((custOrderItems) => [...custOrderItems, prodId]);
          }
        }
      }
      console.log("Cust order Items: ", custOrderItems[0]);
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

  const createSuppProduct = (name, price, ipfsImgHash) => {
    setLoading(true);
    marketplace.methods
      .createSuppProduct(name, price, ipfsImgHash)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Successfully created");
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

  const createRestProduct = (name, price, imageHash) => {
    setLoading(true);
    marketplace.methods
      .createRestProduct(name, price, imageHash)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Successfully created");
        window.location.reload();
        setLoading(false);
      });
  };

  // const purchaseProduct = (id, price) => {
  //   setLoading(true);
  //   marketplace.methods
  //     .purchaseProduct(id)
  //     .send({ from: account, value: price })
  //     .once("receipt", (receipt) => {
  //       setLoading(false);
  //     });
  // };

  const purchaseProduct = (custId, seller, totalCost, date, time) => {
    setLoading(true);
    marketplace.methods
      .purchaseProduct(custId, seller, totalCost, date, time)
      .send({ from: account, value: totalCost })
      .once("receipt", (receipt) => {
        alert("Successfully Purchased");
        window.location.reload();
        setLoading(false);
      });
  };

  return (
    <div>
      <Router>
        {account === suppPublicKey ? (
          <SuppNav
            account={account}
            loading={loading}
            products={suppProducts}
            productCount={productCount}
            createProduct={createSuppProduct}
            purchaseProduct={purchaseProduct}
          />
        ) : null}
        {account === restPublicKey ? (
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
          />
        ) : null}
        {account === custPublicKey ? (
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
            editCustProfile={editCustProfile}
            addToCart={addToCart}
            removeProdCart={removeProdCart}
            removeAllProdCart={removeAllProdCart}
            purchaseProduct={purchaseProduct}
            custOrders={custOrders}
            custOrderItems={custOrderItems}
          />
        ) : null}
      </Router>
    </div>
  );
}
