import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";
import SuppNav from "./Supplier/SuppNavbar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RestNavbar from "./Restaurant/RestNavbar";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState("");
  const [productCount, setProductCount] = useState(0);
  const [marketplace, setMarketPlace] = useState({});
  const [suppProducts, setSuppProducts] = useState([]);
  const [suppProdCount, setSuppProdCount] = useState(0);
  const [restProducts, setRestProducts] = useState([]);
  const [restProdCount, setRestProdCount] = useState(0);

  //acount details
  const restPublicKey = "0x73c005D4B234C63F416F6e1038C011D55edDBF1e";
  const suppPublicKey = "0x09Df3eb010bF64141C020b2f98d521916dF2F9a8";

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
      console.log("Account Number: " + account.toString());
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
        setLoading(false);
      });
  };

  const createRestProduct = (name, price) => {
    setLoading(true);
    marketplace.methods
      .createRestProduct(name, price)
      .send({ from: account })
      .once("receipt", (receipt) => {
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
        {account == suppPublicKey ? (
          <SuppNav
            account={account}
            loading={loading}
            products={suppProducts}
            productCount={productCount}
            createProduct={createSuppProduct}
            purchaseProduct={purchaseProduct}
          />
        ) : null}
        {account == restPublicKey ? (
          <RestNavbar
            account={account}
            loading={loading}
            restProducts={restProducts}
            restProdCount={restProdCount}
            suppProducts={suppProducts}
            suppProdCount={suppProdCount}
            createProduct={createRestProduct}
            purchaseProduct={purchaseProduct}
          />
        ) : null}
      </Router>
    </div>
  );
}
