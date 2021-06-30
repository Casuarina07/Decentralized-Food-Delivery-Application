import React, { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";
import { BrowserRouter as Router } from "react-router-dom";
import SuppNav from "./Supplier/SuppNavbar";
import RestNavbar from "./Restaurant/RestNavbar";
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
    console.log("TEST: " + accounts);
    setAccount(accounts[0]);

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
        setRestProducts((restProducts) => [...restProducts, restProduct]);
      }

      //FETCH HAWKERS
      const hawkersCount = await marketplace.methods.hawkersCount().call();
      setHawkersCount(hawkersCount);
      for (var j = 1; j <= hawkersCount; j++) {
        const hawker = await marketplace.methods.hawkers(j).call();
        setHawkers((hawkers) => [...hawkers, hawker]);
        console.log("Hawker Owner: " + hawker.owner);
        if (hawker.owner.toString() === accounts.toString()) {
          setHawkerName(hawker.name);
          setHawkerAdd(hawker.addressLocation);
          setHawkerOpeningHours(hawker.openingHours);
          setHawkerPhone(hawker.phone);
          setHawkerBoolOpen(hawker.open);
          console.log("SAME");
        }
        for (var l = 0; l < hawkersPublicKey.length; l++) {
          console.log(hawkersPublicKey[l]);
          if (hawkersPublicKey[l] === account) {
            console.log("hello");
          }
        }
      }

      setLoading(false);
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  }

  const createSuppProduct = (name, price) => {
    setLoading(true);
    marketplace.methods
      .createSuppProduct(name, price)
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

  const createRestProduct = (name, price) => {
    setLoading(true);
    marketplace.methods
      .createRestProduct(name, price)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Successfully created");
        window.location.reload();
        setLoading(false);
      });
  };

  const purchaseProduct = (id, price) => {
    setLoading(true);
    marketplace.methods
      .purchaseProduct(id)
      .send({ from: account, value: price })
      .once("receipt", (receipt) => {
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
            hawkerName={hawkerName}
            hawkerAdd={hawkerAdd}
            hawkerOpeningHours={hawkerOpeningHours}
            hawkerPhone={hawkerPhone}
            hawkerBoolOpen={hawkerBoolOpen}
          />
        ) : null}
      </Router>
    </div>
  );
}
