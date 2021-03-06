import React, { Component } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Button, ButtonToolbar, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { EditModal } from "./EditModal";
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
    let currentDate = new Date();
    let minDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    this.state = {
      buffer: null,
      imageHash: "",
      imageChange: false,
      publish: true,
      editModalShow: false,
      productId: "",
      productModal: [],
      expirationDate: minDate,
      minDate: minDate,
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
    const size = this.size.value;
    const minOrder = this.minOrder.value;

    var expiryDate = this.state.expirationDate.toLocaleDateString("en-GB");
    console.log("What is this: ", expiryDate);
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
          size,
          minOrder,
          this.publish,
          this.state.imageHash,
          expiryDate
        );
      });
    } else {
      //create product without imageHash
      this.props.createSuppProduct(
        name,
        price,
        size,
        minOrder,
        this.publish,
        "",
        expiryDate
      );
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
          <div className="form-group mr-sm-2">
            <input
              id="size"
              min="0"
              type="number"
              step="any"
              ref={(input) => {
                this.size = input;
              }}
              className="form-control"
              placeholder="Packaging Size (kg) "
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="minOrder"
              min="1"
              type="number"
              step="any"
              ref={(input) => {
                this.minOrder = input;
              }}
              className="form-control"
              placeholder="Minimum order (units) "
            />
          </div>
          <div
            className="form-group mr-sm-2"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: 20,
            }}
          >
            <label style={{ marginRight: 10, size: 20 }}>
              Expiration Date:
            </label>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              minDate={this.state.minDate}
              selected={this.state.expirationDate}
              onChange={(date) => this.setState({ expirationDate: date })}
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
        <CardGroup>
          {this.props.suppProducts.map((product, key) => {
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
                        <div>
                          Price:{" "}
                          {window.web3.utils.fromWei(
                            product.price.toString(),
                            "Ether"
                          )}{" "}
                          Eth
                        </div>{" "}
                      </Card.Text>
                      <Card.Text>Packaging Size: {product.size}kg</Card.Text>
                      <Card.Text>
                        Minimum Order: {product.minOrder} unit(s)
                      </Card.Text>
                      <Card.Text>
                        Expiration Date: {product.expiryDate}
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
                          editProduct={this.props.editSuppProduct}
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
