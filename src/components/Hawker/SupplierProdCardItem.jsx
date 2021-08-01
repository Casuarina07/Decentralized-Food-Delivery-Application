import React, { Component } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Row, Col, Button } from "react-bootstrap";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";

export default class SupplierProdCardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemQty: 1,
    };
  }

  addItem() {
    this.setState({ itemQty: this.state.itemQty + 1 });
  }

  removeItem() {
    this.setState({ itemQty: this.state.itemQty - 1 });
  }
  render() {
    const product = this.props.product;
    return (
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
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            {" "}
            {window.web3.utils.fromWei(product.price.toString(), "Ether")} Eth
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <h5></h5>
          {this.state.itemQty != 1 ? (
            <FaMinusSquare
              size="25"
              onClick={() => {
                this.removeItem();
              }}
              style={{ cursor: "pointer", marginRight: 5 }}
            />
          ) : (
            <FaMinusSquare
              disabled
              size="25"
              style={{
                cursor: "pointer",
                marginRight: 5,
                opacity: 0.7,
                pointerEvents: "none",
              }}
            />
          )}

          {this.state.itemQty}
          <FaPlusSquare
            size="25"
            onClick={() => {
              this.addItem();
            }}
            style={{ cursor: "pointer", marginLeft: 5 }}
          />
          <div>
            <Button
              style={{ marginLeft: 10, marginTop: 10 }}
              variant="primary"
              onClick={(event) => {
                this.props.addToCartHawker(
                  this.props.hawkerId,
                  product.id,
                  this.state.itemQty
                );
              }}
            >
              Add to Cart
            </Button>
          </div>
        </Card.Footer>
      </Card>
    );
  }
}
