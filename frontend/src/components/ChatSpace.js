import React from "react";
import Container from "react-bootstrap/Container";
import { useUserContext } from "../context/UserContext";
import Chat from "./Chat";
import Row from "react-bootstrap/Row";
const ChatSpace = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = useUserContext();
  return (
    <Container className="chat-space-container">
      {selectedChat ? (
        <Chat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      ) : (
        <Row>Please click on a chat to start chatting</Row>
      )}
    </Container>
  );
};

export default ChatSpace;
