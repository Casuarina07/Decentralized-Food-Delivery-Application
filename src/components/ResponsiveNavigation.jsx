import React, { useState } from "react";
import { Link } from "@reach/router";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Button, Image } from "react-bootstrap";
import { RiCoinsFill } from "react-icons/ri";

function ResponsiveNavigation({
  background,
  hoverBackground,
  linkColor,
  navLinks,
  logo,
  accBalance,
}) {
  const [navOpen, setNavOpen] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [clickedIndex, setClickedIndex] = useState(-1);

  return (
    <nav
      className="responsive-toolbar"
      style={{ background: background, zIndex: 1 }}
    >
      <ul
        style={{ background: background }}
        className={navOpen ? "active" : ""}
      >
        <figure
          className="image-logo"
          onClick={() => {
            setNavOpen(!navOpen);
          }}
        >
          <img src={logo} height="40px" width="40px" alt="toolbar-logo" />
        </figure>
        {navLinks.map((link, index) => (
          <li
            id={index.toString()}
            key={index}
            onMouseEnter={() => {
              setHoverIndex(index);
            }}
            onMouseDown={() => {
              console.log("Pressed: ", index);
              setClickedIndex(index);
              // var a = document.getElementById(clickedIndex.toString());
              // a.style.background = "red";
            }}
            onMouseLeave={() => {
              setHoverIndex(-1);
            }}
            style={{
              background: hoverIndex === index ? hoverBackground || "#999" : "",
            }}
          >
            <Link to={link.path} style={{ color: linkColor }}>
              {" "}
              {link.text} {link.cartCount}
              <i className={link.icon} />
            </Link>
          </li>
        ))}
        <div
          style={{
            backgroundColor: "#e5e5e5",
            marginLeft: "auto",
            marginRight: 15,
            borderRadius: 5,
            padding: 5,
          }}
        >
          <RiCoinsFill />
          <b>{Number(accBalance).toFixed(4)} Eth</b>
        </div>
      </ul>
    </nav>
  );
}

export default ResponsiveNavigation;
