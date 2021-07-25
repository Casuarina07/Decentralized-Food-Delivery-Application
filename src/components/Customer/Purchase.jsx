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

class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemQty: 1,
    };
  }

  qtyMinus = (event, key) => {};
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
                  let qty = 1;
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
                            {/* <DropdownButton
                              as={ButtonGroup}
                              id={`dropdown-button-drop-down`}
                              drop="down"
                              variant="secondary"
                              title={1}
                            >
                              <Dropdown.Item
                                eventKey="1"
                                onClicked={console.log("Clicked")}
                              >
                                1
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="2">2</Dropdown.Item>
                              <Dropdown.Item eventKey="3">4</Dropdown.Item>
                              <Dropdown.Item eventKey="4">5</Dropdown.Item>
                            </DropdownButton> */}
                            <h5></h5>
                            <FaMinusSquare
                              size="25"
                              onClick={(event) => {
                                qty = qty - 1;
                                console.log("QTY? : ", qty);
                                // console.log("Clicked Minus");
                                // this.setState({
                                //   itemQty: this.state.itemQty - 1,
                                // });
                                this.qtyMinus(event, key);
                              }}
                              style={{ cursor: "pointer", marginRight: 5 }}
                            />
                            {/* {this.state.itemQty} */}
                            {qty}
                            <FaPlusSquare
                              size="25"
                              onClick={(key) => {
                                qty = qty + 1;
                                // console.log("Clicked Plus");
                                // this.setState({
                                //   itemQty: this.state.itemQty + 1,
                                // });
                                // this.qtyMinus(product, key);
                              }}
                              style={{ cursor: "pointer", marginLeft: 5 }}
                            />

                            <Button
                              style={{ marginLeft: 10 }}
                              variant="primary"
                              onClick={(event) => {
                                this.props.addToCart(product.id, 1);
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
