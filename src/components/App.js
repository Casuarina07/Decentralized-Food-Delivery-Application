import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import Marketplace from '../abis/Marketplace.json';
import SupplierNav from './Supplier/Navbar';
import RestNav from './Restaurant/Navbar';
import Main from './Main';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const StyledDiv = styled.div`
width: 960px;
position: relative;
margin:0 auto;
line-height: 1.4em;

@media only screen and (max-width: 479px){
  #container2 { width: 20%; }
}
`;

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    //Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()    //5777
    const networkData = Marketplace.networks[networkId]
    if(networkData) {
      const marketplace = new web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({ marketplace: marketplace })
      //console log the number of products
      const productCount = await marketplace.methods.productCount().call()
      this.setState({ productCount: productCount })
      console.log("Number of products: " + productCount)
      //fetch each product from the blockchain
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call()
        this.setState({
          products: [...this.state.products, product]
        })
      }
      console.log("Account Number: " + this.state.account)
      this.setState({ loading: false })
    }
    else {
      window.alert('Marketplace contract not deployed to detected network.')
    }    
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    }
    this.createProduct = this.createProduct.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this)
  }

  createProduct(name, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.createProduct(name, price).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  purchaseProduct(id, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div>
         <Router>
            {this.state.account == '0x09Df3eb010bF64141C020b2f98d521916dF2F9a8'? <SupplierNav account={this.state.account}/>: null }
            {this.state.account == '0x73c005D4B234C63F416F6e1038C011D55edDBF1e'? <RestNav account={this.state.account}/>: null }
         </Router>
        <StyledDiv className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex mt-2">
              { this.state.loading 
                ? <div id="loader" className="text-center"> <p className="text-center">Loading...</p></div>
                : <Main 
                  products={this.state.products} 
                  createProduct={this.createProduct}
                  purchaseProduct={this.purchaseProduct} />
              }
            </main>
          </div>
        </StyledDiv>
      </div>
    );
  }
}

export default App;
