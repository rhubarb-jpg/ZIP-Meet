import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { Link, useNavigate } from "react-router-dom";
function Topnav() {
  const location = useLocation();
  const { logout } = useLogout();
  const navigate = useNavigate();
  if (location.pathname === "/login") {
    return null;
  }

  const handleClick = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        className="shadow-lg p-3 mb-5 justify-content-right"
      >
        <Container fluid className="nav-con">
          <Navbar.Brand href="/home">
            <img
              alt=""
              src="/imgs/logo.svg"
              width="auto"
              height="50"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
          <Nav.Link href="/browse">Browse</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/chats">Messages</Nav.Link>
          <Nav.Link href="/home">Settings</Nav.Link>
          <Button onClick={handleClick}>Logout</Button>
        </Container>
      </Navbar>
    </>
  );
}

export default Topnav;
