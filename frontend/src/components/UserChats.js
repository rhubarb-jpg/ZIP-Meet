import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import { getOtherUser, getOtherUserPic } from "../functions/chatFunctions";

const UserChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } =
    useUserContext();

  console.log(selectedChat);
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          withCredentials: true,
        },
      };
      const response = await axios.get("/api/chat", config);
      setChats(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("user")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Container className="left-chats-container">
      <Row>
        <h1>My Chats</h1>
      </Row>
      <Col className="chats-list-container">
        {chats ? (
          <Stack direction="vertical" className="chat-stack" gap={3}>
            {chats.map((chat) => (
              <Row
                className={
                  selectedChat == chat
                    ? "chat-list-component bg-primary"
                    : "chat-list-component bg-light"
                }
                onClick={() => {
                  setSelectedChat(chat);
                }}
                key={chat._id}
                color={selectedChat == chat ? "white" : "black"}
              >
                <img
                  className="chat-list-pic"
                  src={getOtherUserPic(loggedUser, chat.users)}
                />
                {getOtherUser(loggedUser, chat.users)}
              </Row>
            ))}
          </Stack>
        ) : (
          <div>loading</div>
        )}
      </Col>
    </Container>
  );
};

export default UserChats;
