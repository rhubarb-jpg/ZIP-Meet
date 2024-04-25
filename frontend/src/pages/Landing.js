import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

// components
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";

function Landing() {
  return (
    <Container className="ca-main-container">
      <Card className="create-account-card">
        <Tab.Container defaultActiveKey="first">
          <Row sm={3}>
            <Nav variant="pills" className="nav-login">
              <Nav.Item className="nav-item">
                <Nav.Link eventKey="first">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item">
                <Nav.Link eventKey="second">Register</Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
          <Row>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <LoginForm />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <SignUpForm />
              </Tab.Pane>
            </Tab.Content>
          </Row>
        </Tab.Container>
      </Card>
    </Container>
  );
}
export default Landing;
