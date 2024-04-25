import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

// components
import ProfileComp from "../components/ProfileComp";
import ChangePassword from "../components/ChangePassword";
//import ChangePhoneNum from "../components/ChangePhoneNum";
import DeleteAccount from "../components/PrivacyAndSecurity";

function Settings() {
  return (
    <Container className="ca-main-container">
      <Card className="settings-card">
        <Tab.Container defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item className="nav-settings">
                  <Nav.Link eventKey="first">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item className="nav-settings">
                  <Nav.Link eventKey="second">Change Password</Nav.Link>
                </Nav.Item>
                <Nav.Item className="nav-settings">
                  <Nav.Link eventKey="fourth">Privacy & Security</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>

            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <ProfileComp />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <ChangePassword />
                </Tab.Pane>

                <Tab.Pane eventKey="fourth">
                  <DeleteAccount />

                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Card>
    </Container>
  );
}
export default Settings;