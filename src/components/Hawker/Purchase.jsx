import React, { Component } from "react";
import "./Rest.css";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "@reach/router";
import SupplierProdCardItem from "./SupplierProdCardItem";

class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSearch: "",
    };
  }
  render() {
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
        {this.props.suppliers.map((supplier, key) => {
          return (
            <>
              <h4 style={{ display: "flex", marginTop: 20 }}>
                <Link
                  to={`/supplierInfo/${supplier.owner}`}
                  state={{ chosenSupplierPk: supplier.owner }}
                >
                  {supplier.name}
                </Link>
              </h4>

              <h6 style={{ display: "flex", color: "#808080" }}>
                {supplier.owner}
              </h6>
              <CardGroup>
                {this.props.suppProducts
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
                      product.owner == supplier.owner &&
                      product.published == true
                    )
                      return (
                        <Col md={4}>
                          <SupplierProdCardItem
                            product={product}
                            hawkerId={this.props.hawkerId}
                            addToCartHawker={this.props.addToCartHawker}
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
