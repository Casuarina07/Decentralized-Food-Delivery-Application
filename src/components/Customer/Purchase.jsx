import React, { Component } from "react";
import "./Cust.css";
import { Link } from "@reach/router";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Row, Col, Button } from "react-bootstrap";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import ProductCardItem from "./ProductCardItem";

class Purchase extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ margin: 70, marginTop: 20 }}>
        <h2>Purchase Food</h2>
        {this.props.hawkers.map((hawker, key) => {
          return (
            <>
              <h4 style={{ display: "flex", marginTop: 20 }}>
                <Link
                  to={`/hawkerInfo/${hawker.owner}`}
                  state={{ chosenHawkerPk: hawker.owner }}
                >
                  {hawker.name}
                </Link>
              </h4>

              <h6 style={{ display: "flex", color: "#808080" }}>
                {hawker.owner}
              </h6>
              <CardGroup>
                {this.props.restProducts.map((product, key) => {
                  if (
                    product.owner == hawker.owner &&
                    product.published == true
                  )
                    return (
                      <Col md={4}>
                        <ProductCardItem
                          product={product}
                          custId={this.props.custId}
                          addToCart={this.props.addToCart}
                        />
                      </Col>
                    );
                })}
              </CardGroup>
            </>
          );
        })}
      </div>
    );
  }
}

export default Purchase;
