import React, { Component } from "react";
import "./Rest.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const { create } = require("ipfs-http-client");
const ipfs = create({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
});

class Sell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buffer: null,
      imageHash: "",
      imageChange: false,
      publish: true,
    };
  }
  captureFile = (event) => {
    this.imageChange = true;
    event.preventDefault();
    console.log("file captured...");
    //Process file for IPFS - convert to buffer
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
    };
  };
  onSubmit = (event) => {
    event.preventDefault();
    const name = this.productName.value;
    const price = window.web3.utils.toWei(
      this.productPrice.value.toString(),
      "Ether"
    );
    // Image file adding ipfs - Example hash - QmVuL45kGoKVaLMv1FpFBj4h4N5eGageaeFSN4BtXPSGbi
    // Example URL - https://ipfs.infura.io/ipfs/QmVuL45kGoKVaLMv1FpFBj4h4N5eGageaeFSN4BtXPSGbi
    if (this.imageChange == true) {
      const file = ipfs.add(this.state.buffer);
      const resultPromise = file.then(function (result) {
        console.log("result", result.path.toString());
        return result.path.toString();
      });

      resultPromise.then((path) => {
        console.log("Path: ", path);
        this.setState({ imageHash: path });
        const img = this.state.imageHash;
        console.log("Img: ", img);

        //create product
        this.props.createProduct(
          name,
          price,
          this.publish,
          this.state.imageHash
        );
      });
    } else {
      //create product without imageHash
      this.props.createProduct(name, price, this.publish, "");
    }
  };

  handleSwitch = (event) => {
    this.publish = !this.publish;
    console.log("Publish State: ", this.publish);
  };

  render() {
    console.log("What is this: ", this.props.restProducts);
    return (
      <div style={{ margin: 60, marginTop: 30 }}>
        <h1>Add Product</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => {
                this.productName = input;
              }}
              className="form-control"
              placeholder="Product Name"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => {
                this.productPrice = input;
              }}
              className="form-control"
              placeholder="Product Price"
              required
            />
          </div>
          <div style={{ display: "flex" }}>
            <input
              className="form-group mr-sm-1"
              type="file"
              onChange={this.captureFile}
            />
          </div>
          <div style={{ display: "flex" }}>
            <FormControlLabel
              control={
                <Switch
                  checked={this.publish}
                  onChange={this.handleSwitch}
                  name="publish"
                  color="primary"
                />
              }
              label="Publish"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>
        <p> </p>
        <h2>Product List</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col">Image</th>
            </tr>
          </thead>
          <tbody id="productList">
            {this.props.restProducts.map((product, key) => {
              if (product.owner === this.props.account)
                return (
                  <tr>
                    <td>{product.name}</td>
                    <td>
                      {window.web3.utils.fromWei(
                        product.price.toString(),
                        "Ether"
                      )}{" "}
                      Eth
                    </td>
                    <td>{product.owner}</td>
                    <td>
                      {product.imageHash == "" ? (
                        <label>-</label>
                      ) : (
                        <img
                          height="50"
                          width="120"
                          alt="logo"
                          src={
                            "https://ipfs.infura.io/ipfs/" + product.imageHash
                          }
                        />
                      )}
                    </td>
                  </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Sell;
