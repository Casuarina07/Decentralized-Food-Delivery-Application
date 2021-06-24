import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";
import SuppNav from "./Supplier/SuppNavbar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RestNavbar from "./Restaurant/RestNavbar";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [account, setAccount] = useState("");
  const [productCount, setProductCount] = useState(0);
  const [marketplace, setMarketPlace] = useState({});
  const [restProducts, setRestProducts] = useState([]);

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
      //console log the number of products
      const productCount = await marketplace.methods.productCount().call();
      setProductCount(productCount);
      console.log("Number of products: " + productCount);
      //fetch each product from the blockchain
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call();
        setProducts((products) => [...products, product]);
      }
      console.log("Account Number: " + account.toString());
      setLoading(false);
      console.log("Product: " + products);
      console.log("Loading: " + loading.toString());
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
    products.map((product, key) => {
      if (product.owner == restPublicKey) {
        setRestProducts((restProducts) => [...restProducts, product]);
      }
    });
  }

  const createProduct = (name, price) => {
    setLoading(true);
    marketplace.methods
      .createProduct(name, price)
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
            products={products}
            productCount={productCount}
            createProduct={createProduct}
            purchaseProduct={purchaseProduct}
          />
        ) : null}
        {account == restPublicKey ? (
          <RestNavbar
            account={account}
            loading={loading}
            products={products}
            productCount={productCount}
            createProduct={createProduct}
            purchaseProduct={purchaseProduct}
          />
        ) : null}
      </Router>
    </div>
  );
}
