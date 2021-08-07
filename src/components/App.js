import React, { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";
import Reports from "../abis/Reports.json";
import { BrowserRouter as Router } from "react-router-dom";
import SuppNav from "./Supplier/SuppNavbar";
import RestNavbar from "./Hawker/RestNavbar";
import CustNavbar from "./Customer/CustNavbar";
import FDNavbar from "./FoodDelivery/FDNavbar";
import Register from "./Register/Register";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState("");
  const [productCount, setProductCount] = useState(0);
  const [marketplace, setMarketPlace] = useState({});
  const [reportsContract, setReportsContract] = useState({});
  const [restProducts, setRestProducts] = useState([]);
  const [restProdCount, setRestProdCount] = useState(0);
  const [suppProducts, setSuppProducts] = useState([]);
  const [suppProdCount, setSuppProdCount] = useState(0);
  const [hawkersPublicKey, setHawkersPublicKey] = useState([]);
  const [custsPublicKey, setCustsPublicKey] = useState([]);
  const [fdsPublicKey, setFDsPublicKey] = useState([]);
  const [suppliersPublicKey, setSuppliersPublicKey] = useState([]);
  const [custAcc, setCustAcc] = useState(false);
  const [hawkerAcc, setHawkerAcc] = useState(false);
  const [supplierAcc, setSupplierAcc] = useState(false);
  const [fdAcc, setFDAcc] = useState(false);
  const [newAcc, setNewAcc] = useState(false);
  const [accBalance, setAccBalance] = useState(0);

  //supplier-details
  const [suppliersCount, setSuppliersCount] = useState(0);
  const [suppliers, setSuppliers] = useState([]);
  const [supplier, setSupplier] = useState([]);

  //hawker-details
  const [hawker, setHawker] = useState([]);
  const [hawkerId, setHawkerId] = useState(0);
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
  const [hawkerCart, setHawkerCart] = useState([]);
  const [hawkerCartCount, setHawkerCartCount] = useState(0);

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
  const [custReports, setCustReports] = useState([]);

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
  const [transactions, setTransactions] = useState();
  // const [hawkerReceipts, setHawkerReceipts] = useState([]);

  //REPORTS SMART CONTRACT
  const [reportsCount, setReportsCount] = useState(0);
  const [reportsIssued, setReportsIssued] = useState([]);

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  useEffect(() => {
    accountType();
  }, [hawkersPublicKey, custsPublicKey, fdsPublicKey]);

  async function loadWeb3() {
    console.log("first");
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
    // const transactions = await web3.eth
    //   .getPastLogs({
    //     address: accounts,
    //     fromBlock: "0x1",
    //     toBlock: "latest",
    //   })
    //   .then(console.log)
    //   .catch((e) => console.log(e));
    // setTransactions(transactions);
    // console.log("Account: ", transactions);
    let balance = await web3.eth.getBalance(accounts.toString());
    let accountBalance = web3.utils.fromWei(balance.toString());
    setAccBalance(accountBalance);

    const networkId = await web3.eth.net.getId(); //5777
    const networkData = Marketplace.networks[networkId];
    const networkDataReport = Reports.networks[networkId];
    if (networkData) {
      const marketplace = new web3.eth.Contract(
        Marketplace.abi,
        networkData.address
      );
      setMarketPlace(marketplace);

      const reports = new web3.eth.Contract(
        Reports.abi,
        networkDataReport.address
      );
      setReportsContract(reports);

      //testing reports solidity connection
      var result = await reports.methods.name.call().call((error, result) => {
        console.log("RESULT NAME: ", result);
      });

      const reportCount = await reports.methods.reportsCount().call();
      setReportsCount(reportCount);
      console.log("How many reports Counts are there? ", reportCount);
      for (var i = 1; i <= reportCount; i++) {
        const reportIssued = await reports.methods.reports(i).call();
        setReportsIssued((reportsIssued) => [...reportsIssued, reportIssued]);
        if (reportIssued.reporter == accounts.toString()) {
          let imageHash = await reports.methods
            .getImageHash(reportIssued.id)
            .call();
          let missingItems = await reports.methods
            .getMissingItems(reportIssued.id)
            .call();
          let newReportIssued = reportIssued;
          newReportIssued = Object.assign(
            { imageHash: imageHash, missingItems: missingItems },
            newReportIssued
          );
          setCustReports((custReports) => [...custReports, newReportIssued]);
        }
      }

      //FETCH RESTAURANT PRODUCTS
      const restProdCount = await marketplace.methods.restProdCount().call();
      setRestProdCount(restProdCount);
      for (var k = 1; k <= restProdCount; k++) {
        const restProduct = await marketplace.methods.restProducts(k).call();
        setRestProducts((restProducts) => [...restProducts, restProduct]);
      }

      //FETCH SUPPLIER PRODUCTS
      const suppProductCount = await marketplace.methods.suppProdCount().call();
      setSuppProdCount(suppProductCount);
      for (var k = 1; k <= suppProductCount; k++) {
        const suppProduct = await marketplace.methods.suppProducts(k).call();
        setSuppProducts((suppProducts) => [...suppProducts, suppProduct]);
      }

      //FETCH SUPPLIERS
      const suppliersCount = await marketplace.methods.suppliersCount().call();
      console.log("suppliers Count: ", suppliersCount);
      setSuppliersCount(suppliersCount);
      for (var j = 1; j <= suppliersCount; j++) {
        const supplier = await marketplace.methods.suppliers(j).call();
        setSuppliers((suppliers) => [...suppliers, supplier]);
        setSuppliersPublicKey((suppliersPublicKey) => [
          ...suppliersPublicKey,
          supplier.owner,
        ]);
        if (supplier.owner.toString() === accounts.toString()) {
          console.log("Supplier Account");
          setSupplier(supplier);
        }
      }
      // if (suppliersCount == 0) return;
      // for (var j = 1; j <= suppliersCount; j++) {
      //   const supplier = await marketplace.methods.suppliers(j).call();
      //   setSuppliers((suppliers) => [...suppliers, supplier]);
      //   setSuppliersPublicKey((suppliersPublicKey) => [
      //     ...suppliersPublicKey,
      //     supplier.owner,
      //   ]);
      //   if (supplier.owner.toString() === accounts.toString()) {
      //     console.log("Supplier Account");
      //     setSupplier(supplier);
      //   }
      //   // for (var k = 1; k <= supplier.feedbackCount; k++) {
      //   //   const prodId = await marketplace.methods
      //   //     .getHawkerFeedback(hawker.id, k)
      //   //     .call();
      //   //   setHawkerFeedback((hawkerFeedback) => [...hawkerFeedback, prodId]);
      //   // }
      // }

      //FETCH HAWKERS
      const hawkersCount = await marketplace.methods.hawkersCount().call();
      console.log("what is the hawkers Count: ", hawkersCount);
      setHawkersCount(hawkersCount);
      // if (hawkersCount == 0) return;
      for (var j = 1; j <= hawkersCount; j++) {
        const hawker = await marketplace.methods.hawkers(j).call();
        setHawkers((hawkers) => [...hawkers, hawker]);
        setHawkersPublicKey((hawkersPublicKey) => [
          ...hawkersPublicKey,
          hawker.owner,
        ]);
        if (hawker.owner.toString() === accounts.toString()) {
          console.log("Hawker Account");
          setHawker(hawker);
          setHawkerId(hawker.id);
          setHawkerName(hawker.name);
          setHawkerAdd(hawker.addressLocation);
          setHawkerOpeningHours(hawker.openingHours);
          setHawkerPhone(hawker.phone);
          setHawkerBoolOpen(hawker.open);
          setHawkerRating(hawker.avgRating);
          setHawkerCartCount(hawker.itemCount);

          //fetch cart products
          for (var k = 1; k <= hawker.itemCount; k++) {
            let product = await marketplace.methods
              .getCartProduct(hawker.id, k, 2)
              .call();
            setHawkerCart((hawkerCart) => [...hawkerCart, product]);
          }
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
      if (customersCount == 0) return;

      for (var l = 1; l <= customersCount; l++) {
        const cust = await marketplace.methods.customers(l).call();
        setCustomers((customers) => [...customers, cust]);
        setCustsPublicKey((custsPublicKey) => [
          ...custsPublicKey,
          cust.owner.toString(),
        ]);
        if (cust.owner.toString() === accounts.toString()) {
          console.log("Customer Account: ", cust.name);
          setCustId(cust.id);
          setCustName(cust.name);
          setCustAdd(cust.addressLocation);
          setCustPhone(cust.phone);
          setCartCount(cust.itemCount);

          //fetch cart products
          for (var k = 1; k <= cust.itemCount; k++) {
            let product = await marketplace.methods
              .getCartProduct(cust.id, k, 1)
              .call();
            setCustCart((custCart) => [...custCart, product]);
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
            let prod = await marketplace.methods
              .getOrderProduct(order.id, k)
              .call();
            prod = Object.assign({ orderId: order.id }, prod);
            setCustOrderItems((custOrderItems) => [...custOrderItems, prod]);
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
        if (order.state >= 2 && order.rider.toString() == accounts.toString()) {
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
      if (fdCount == 0) return;

      for (var j = 1; j <= fdCount; j++) {
        const foodDelivery = await marketplace.methods.foodDeliveries(j).call();
        setFoodDeliveries((foodDeliveries) => [
          ...foodDeliveries,
          foodDelivery,
        ]);
        setFDsPublicKey((fdsPublicKey) => [
          ...fdsPublicKey,
          foodDelivery.owner,
        ]);
        if (foodDelivery.owner.toString() === accounts.toString()) {
          setFDDelivery(foodDelivery);
        }
      }

      //get all previous events
      // marketplace.getPastEvents(
      //   "RestProdCreated",
      //   {
      //     // filter: { owner: accounts },
      //     fromBlock: 0,
      //     toBlock: "latest",
      //   },
      //   (errors, results) => {
      //     if (!errors) {
      //       console.log("Rest Prod Created results: ", results);
      //       setPastEvents(results);
      //     }
      //   }
      // );
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  }

  async function accountType() {
    const web3 = window.web3;
    //Load account
    const accounts = await web3.eth.getAccounts();
    console.log("WHAT IS THIS PLS: ", accounts.toString());
    console.log("ALL THE HAWKER ACCOUNTS: ", hawkersPublicKey);
    console.log("ALL THE CUSTOMER ACCOUNTS: ", custsPublicKey);
    console.log("ALL THE FD ACCOUNTS: ", fdsPublicKey);
    console.log("ALL THE SUPPLIER ACCOUNTS: ", suppliersPublicKey);
    console.log("Reports Issued: ", reportsIssued);
    console.log("Customer reports: ", custReports);

    // check if customer, hawkers, suppliers or fooddelivery (fd)
    for (var i = 0; i < hawkersPublicKey.length; i++) {
      if (accounts.toString() === hawkersPublicKey[i]) {
        setHawkerAcc(true);
        setNewAcc(false);
        return;
      }
    }
    for (var i = 0; i < custsPublicKey.length; i++) {
      if (accounts.toString() === custsPublicKey[i]) {
        setCustAcc(true);
        setNewAcc(false);
        return;
      }
    }

    for (var i = 0; i < fdsPublicKey.length; i++) {
      if (accounts.toString() === fdsPublicKey[i]) {
        setFDAcc(true);
        setNewAcc(false);
        return;
      }
    }
    for (var i = 0; i < suppliersPublicKey.length; i++) {
      if (accounts.toString() === suppliersPublicKey[i]) {
        setSupplierAcc(true);
        setNewAcc(false);
        return;
      }
    }
    // if (
    //   custAcc == true ||
    //   hawkerAcc == true ||
    //   fdAcc == true ||
    //   supplierAcc == true
    // ) {
    //   setNewAcc(false);
    // } else {
    //   setNewAcc(true);
    // }

    // if (
    //   custAcc == false &&
    //   hawkerAcc == false &&
    //   fdAcc == false &&
    //   supplierAcc == false
    // )
    //   setNewAcc(true);
    setNewAcc(true);
    setLoading(false);
  }

  const createReport = (orderId, title, imageHash, missingItems, remarks) => {
    setLoading(true);
    reportsContract.methods
      .createReport(orderId, title, imageHash, missingItems, remarks)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Report successfully sent");
        window.location.reload();
        setLoading(false);
      });
  };

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

  const removeAllProdCart = (id, indicator) => {
    setLoading(true);
    marketplace.methods
      .removeAllProdCart(id, indicator)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Successfully Removed All Products");
        window.location.reload();
        setLoading(false);
      });
  };

  const editHawkerProfile = (id, phone, openingHours, leadTime) => {
    setLoading(true);
    marketplace.methods
      .editHawkerProfile(id, phone, openingHours, leadTime)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Successfully Changed");
        window.location.reload();
        setLoading(false);
      });
  };

  const boolOpen = (id) => {
    setLoading(true);
    marketplace.methods
      .boolOpen(id)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Shop status changed");
        window.location.reload();
        setLoading(false);
      });
  };

  const boolWork = (id) => {
    setLoading(true);
    marketplace.methods
      .boolWork(id)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Status changed");
        window.location.reload();
        setLoading(false);
      });
  };

  const editCustProfile = (id, phone, address) => {
    setLoading(true);
    marketplace.methods
      .editCustProfile(id, phone, address)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Successfully Changed");
        window.location.reload();
        setLoading(false);
      });
  };

  const editSupplierProfile = (
    id,
    phone,
    moq,
    leadTime,
    deliveryDays,
    remarks
  ) => {
    setLoading(true);
    marketplace.methods
      .editSupplierProfile(id, phone, moq, leadTime, deliveryDays, remarks)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Successfully Changed");
        window.location.reload();
        setLoading(false);
      });
  };

  const addToCart = (cust_id, prod_id, qty) => {
    setLoading(true);
    marketplace.methods
      .addToCart(cust_id, prod_id, qty)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Successfully Added");
        window.location.reload();
        setLoading(false);
      });
  };

  const addToCartHawker = (hawker_id, prod_id, qty) => {
    setLoading(true);
    marketplace.methods
      .addToCartHawker(hawker_id, prod_id, qty)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Successfully Added");
        window.location.reload();
        setLoading(false);
      });
  };

  const hawkerConfirmOrder = (orderId, estTime) => {
    setLoading(true);
    marketplace.methods
      .hawkerConfirmOrder(orderId, estTime)
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

  const fdCollectedOrder = (orderId) => {
    setLoading(true);
    marketplace.methods
      .fdCollectedOrder(orderId)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Order collected");
        window.location.reload();
        setLoading(false);
      });
  };

  const fdCompleteOrder = (orderId, fdId, dateTime) => {
    setLoading(true);
    marketplace.methods
      .fdCompleteOrder(orderId, fdId, dateTime)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Order completed");
        window.location.reload();
        setLoading(false);
      });
  };

  const setRating = (
    orderId,
    hawkerId,
    hawkerRate,
    hawkerComment,
    fdId,
    fdRate,
    fdComment
  ) => {
    setLoading(true);
    marketplace.methods
      .setRating(
        orderId,
        hawkerId,
        hawkerRate,
        hawkerComment,
        fdId,
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
        console.log("Receipt: ", receipt);
        alert("Successfully created");
        window.location.reload();
        setLoading(false);
      });
  };

  const createSuppProduct = (
    name,
    price,
    size,
    minOrder,
    published,
    imageHash
  ) => {
    setLoading(true);
    marketplace.methods
      .createSuppProduct(name, price, size, minOrder, published, imageHash)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("Successfully created");
        window.location.reload();
        setLoading(false);
      });
  };

  const purchaseProduct = (
    indicator,
    custId,
    seller,
    hawkerPayment,
    riderPayment,
    totalCost,
    dateTime,
    deliveryDateTime
  ) => {
    setLoading(true);
    marketplace.methods
      .purchaseProduct(
        indicator,
        custId,
        seller,
        hawkerPayment,
        riderPayment,
        totalCost,
        dateTime,
        deliveryDateTime
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

  const editSuppProduct = (
    productId,
    name,
    price,
    size,
    minOrder,
    imageHash,
    published
  ) => {
    setLoading(true);
    marketplace.methods
      .editSuppProduct(
        productId,
        name,
        price,
        size,
        minOrder,
        imageHash,
        published
      )
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

  const addHawker = (
    owner,
    name,
    addressLocation,
    phone,
    openingHours,
    leadTime,
    licenseHash
  ) => {
    setLoading(true);
    marketplace.methods
      .addHawker(
        owner,
        name,
        addressLocation,
        phone,
        openingHours,
        leadTime,
        licenseHash
      )
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("New Hawker Added");
        window.location.reload();
        setLoading(false);
      });
  };
  const addCustomer = (owner, name, addressLocation, phone) => {
    setLoading(true);
    marketplace.methods
      .addCustomer(owner, name, addressLocation, phone)
      .send({ from: account })
      .once("receipt", (receipt) => {
        // console.log("Receipt?? ", receipt);
        alert("New Customer Added");
        window.location.reload();
        setLoading(false);
      });
  };

  const addFoodDelivery = (owner, name, email, phone) => {
    setLoading(true);
    marketplace.methods
      .addFoodDelivery(owner, name, email, phone)
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("New Food Delivery Rider Added");
        window.location.reload();
        setLoading(false);
      });
  };

  const addSupplier = (
    owner,
    name,
    address,
    phone,
    moq,
    leadTime,
    deliveryDays,
    remarks
  ) => {
    setLoading(true);
    marketplace.methods
      .addSupplier(
        owner,
        name,
        address,
        phone,
        moq,
        leadTime,
        deliveryDays,
        remarks
      )
      .send({ from: account })
      .once("receipt", (receipt) => {
        alert("New supplier Added");
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
            supplier={supplier}
            supplierOrders={hawkerOrders}
            supplierOrderItems={hawkerOrderItems}
            accBalance={accBalance}
            loading={loading}
            productCount={productCount}
            createSuppProduct={createSuppProduct}
            suppProducts={suppProducts}
            marketplace={marketplace}
            pastEvents={pastEvents}
            editSupplierProfile={editSupplierProfile}
            editSuppProduct={editSuppProduct}
          />
        ) : null}
        {hawkerAcc ? (
          <RestNavbar
            account={account}
            accBalance={accBalance}
            loading={loading}
            restProducts={restProducts}
            restProdCount={restProdCount}
            suppProducts={suppProducts}
            suppProdCount={suppProdCount}
            createProduct={createRestProduct}
            purchaseProduct={purchaseProduct}
            editHawkerProfile={editHawkerProfile}
            boolOpen={boolOpen}
            hawker={hawker}
            hawkerId={hawkerId}
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
            suppliers={suppliers}
            addToCartHawker={addToCartHawker}
            hawkerCart={hawkerCart}
            hawkerCartCount={hawkerCartCount}
            custOrders={custOrders}
            custOrderItems={custOrderItems}
            orders={orders}
          />
        ) : null}
        {custAcc ? (
          <CustNavbar
            account={account}
            accBalance={accBalance}
            loading={loading}
            restProducts={restProducts}
            restProdCount={restProdCount}
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
            foodDeliveries={foodDeliveries}
            createReport={createReport}
            reportsIssued={reportsIssued}
            custReports={custReports}
          />
        ) : null}
        {fdAcc ? (
          <FDNavbar
            account={account}
            accBalance={accBalance}
            customers={customers}
            hawkers={hawkers}
            custOrders={custOrders}
            restProducts={restProducts}
            fdDelivery={fdDelivery}
            boolWork={boolWork}
            fdDeliveryOrders={fdDeliveryOrders}
            fdOrderItems={fdOrderItems}
            fdAcceptOrder={fdAcceptOrder}
            fdAcceptedOrders={fdAcceptedOrders}
            fdAcceptedOrderItems={fdAcceptedOrderItems}
            fdCollectedOrder={fdCollectedOrder}
            fdCompleteOrder={fdCompleteOrder}
          />
        ) : null}
        {newAcc ? (
          <Register
            addHawker={addHawker}
            addCustomer={addCustomer}
            addFoodDelivery={addFoodDelivery}
            addSupplier={addSupplier}
          />
        ) : null}
      </Router>
    </div>
  );
}
