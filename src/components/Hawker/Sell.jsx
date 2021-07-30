import React, { Component } from "react";
import "./Rest.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Button, ButtonToolbar, Col } from "react-bootstrap";
import { EditModal } from "./EditModal";
import Modal from "@material-ui/core/Modal";
import { GoPrimitiveDot } from "react-icons/go";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

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

  handleShow = (event) => {
    this.rateShow = !this.rateShow;
    console.log("Rate Show: ", this.rateShow);
  };

  render() {
    let editModalClose = () => this.setState({ editModalShow: false });
    console.log("REST PRODUCTS: ", this.props.restProducts);
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
              type="number"
              min="0"
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
              accept="image/*"
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
        <CardGroup>
          {this.props.restProducts.map((product, key) => {
            if (product.owner === this.props.account)
              return (
                <Col md={4}>
                  <Card style={{ marginTop: 15 }}>
                    <Card.Img
                      style={{
                        width: 150,
                        height: 150,
                        alignSelf: "center",
                      }}
                      variant="top"
                      src={"https://ipfs.infura.io/ipfs/" + product.imageHash}
                    />
                    <Card.Body>
                      <Card.Title>
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
                      </Card.Title>
                      <Card.Text>
                        {" "}
                        {window.web3.utils.fromWei(
                          product.price.toString(),
                          "Ether"
                        )}{" "}
                        Eth
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      {/* <small className="text-muted">
                      Owner: {this.props.account}
                    </small> */}
                      <ButtonToolbar style={{ justifyContent: "center" }}>
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
                    </Card.Footer>
                  </Card>
                </Col>
              );
          })}
        </CardGroup>
      </div>
    );
  }
}

export default Sell;
