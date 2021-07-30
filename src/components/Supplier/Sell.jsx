import React, { Component } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Button, ButtonToolbar } from "react-bootstrap";
import { EditModal } from "./EditModal";
import Modal from "@material-ui/core/Modal";
import { GoPrimitiveDot } from "react-icons/go";

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
      editModalShow: false,
      productId: "",
      productModal: [],
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
    if (this.imageChange === true) {
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
        this.props.createSuppProduct(
          name,
          price,
          this.publish,
          this.state.imageHash
        );
      });
    } else {
      //create product without imageHash
      this.props.createSuppProduct(name, price, this.publish, "");
    }
  };

  handleSwitch = (event) => {
    this.publish = !this.publish;
    console.log("Publish State: ", this.publish);
  };

  handleShow = (event) => {
    this.rateShow = !this.rateShow;
    console.log("Rate Show: ", this.rateShow);
  };

  render() {
    let editModalClose = () => this.setState({ editModalShow: false });
    console.log("CURRENT SUPPLIER PRODUCTS: ", this.props.suppProducts);

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
              min="0"
              type="number"
              step="any"
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
              <th scope="col">Image</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            {this.props.suppProducts.map((product, key) => {
              if (product.owner === this.props.account)
                return (
                  <tr>
                    <td>
                      {product.published ? (
                        <GoPrimitiveDot
                          style={{ position: "relative", bottom: 2 }}
                          size="20"
                          color="green"
                        />
                      ) : (
                        <GoPrimitiveDot
                          style={{ position: "relative", bottom: 2 }}
                          size="20"
                          color="orange"
                        />
                      )}

                      {product.name}
                    </td>
                    <td>
                      {window.web3.utils.fromWei(
                        product.price.toString(),
                        "Ether"
                      )}{" "}
                      Eth
                    </td>
                    <td>
                      {product.imageHash === "" ? (
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
                    <td>
                      {/* <button>Edit</button> */}
                      <ButtonToolbar>
                        <Button
                          variant="primary"
                          onClick={() => {
                            this.setState({ editModalShow: true });
                            this.setState({ productId: product.id });
                            this.setState({ productModal: product });
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          style={{ marginLeft: 10 }}
                          variant="danger"
                          onClick={() => {
                            console.log("DELETE");
                            this.props.deleteProduct(product.id);
                          }}
                        >
                          Delete
                        </Button>
                        <EditModal
                          show={this.state.editModalShow}
                          onHide={editModalClose}
                          product={this.state.productModal}
                          price={window.web3.utils.fromWei(
                            product.price.toString(),
                            "Ether"
                          )}
                          editProduct={this.props.editProduct}
                          deleteProduct={this.props.deleteProduct}
                        />
                      </ButtonToolbar>
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
