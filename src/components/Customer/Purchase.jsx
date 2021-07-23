import React, { Component } from "react";
import "./Cust.css";
import { Link } from "@reach/router";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Row, Col, Button } from "react-bootstrap";

class Purchase extends Component {
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
                        <Card style={{ marginTop: 15 }}>
                          <Card.Img
                            style={{
                              width: 150,
                              height: 150,
                              alignSelf: "center",
                            }}
                            variant="top"
                            src={
                              "https://ipfs.infura.io/ipfs/" + product.imageHash
                            }
                          />
                          <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
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
                            <Button
                              style={{ marginLeft: 10 }}
                              variant="primary"
                              onClick={(event) => {
                                this.props.addToCart(product.id);
                              }}
                            >
                              Add to Cart
                            </Button>
                          </Card.Footer>
                        </Card>
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
