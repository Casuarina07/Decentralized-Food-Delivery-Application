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
    this.state = {
      inputSearch: "",
    };
  }

  render() {
    console.log(this.props.restProducts);
    return (
      <div style={{ margin: 70, marginTop: 20 }}>
        <input
          type="text"
          placeholder="Search..."
          style={{ display: "flex", paddingLeft: 8 }}
          onChange={(event) =>
            this.setState({ inputSearch: event.target.value })
          }
        />
        {/* <h2>Purchase Food</h2> */}
        {this.props.hawkers.map((hawker, key) => {
          return (
            <>
              <h4 style={{ display: "flex", marginTop: 20 }}>
                <Link
                  to={`/hawkerInfo/${hawker.owner}`}
                  // state={{ chosenHawkerPk: hawker.owner }}
                  state={{ chosenHawkerPk: hawker }}
                >
                  {hawker.name}
                </Link>
              </h4>

              <h6 style={{ display: "flex", color: "#808080" }}>
                {hawker.owner}
              </h6>
              <CardGroup>
                {this.props.restProducts
                  .filter((product) => {
                    if (this.state.inputSearch == "") {
                      return product;
                    } else if (
                      product.name
                        .toLowerCase()
                        .includes(this.state.inputSearch.toLowerCase())
                    ) {
                      return product;
                    }
                  })
                  .map((product, key) => {
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
