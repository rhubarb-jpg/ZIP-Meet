import React from "react";
import { useUserContext } from "../context/UserContext";
import Container from "react-bootstrap/Container";
import UserChats from "../components/UserChats";
import { useState } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ChatSpace from "../components/ChatSpace";
const Chats = () => {
  const { user } = useUserContext();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <Container className="main-chat-container">
      <Row>
        <Col className="chat-view-column">
          {
            user && (
              <UserChats fetchAgain={fetchAgain} />
            ) /* Need to make sure that the context is available before displaying chats*/
          }
        </Col>
        <Col className="chat-space-column">
          {user && (
            <ChatSpace fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Chats;
