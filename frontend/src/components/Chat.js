import Container from "react-bootstrap/esm/Container";
import { useUserContext, UserContext } from "../context/UserContext";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState, useContext } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Row from "react-bootstrap/Row";
import MessagesWindow from "./MessagesWindow";
import React from "react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const Chat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    useUserContext();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);

  const [socketConnected, setSocketConnected] = useState(false);

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          withCredentials: true,
        },
      };
      const response = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );

      setMessages(response.data);
      setIsLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (e) => {
    if (
      (e.key === "Enter" || e.type == "click") &&
      newMessage &&
      newMessage.trim()
    ) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
            withCredentials: true,
          },
        };
        setNewMessage("");
        const response = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );

        socket.emit("new message", response.data);

        setMessages([...messages, response.data]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
    });
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      console.log(selectedChatCompare);
      console.log(newMessageReceived);
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
          console.log("message");
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // typing indicator
  };

  return (
    <Container className="user-chat">
      <Row className="message-row">
        <InputGroup className="message-input">
          <FormControl
            className="message-form"
            placeholder="Message..."
            onChange={typingHandler}
            value={newMessage}
            onKeyDown={sendMessage}
          ></FormControl>
          <Button className="send-message-button" onClick={sendMessage}>
            Send
          </Button>
        </InputGroup>
      </Row>
      {isLoading ? (
        <Spinner className="chat-spinner" />
      ) : (
        <Row className="messages">
          <MessagesWindow messages={messages}></MessagesWindow>
        </Row>
      )}
    </Container>
  );
};

export default Chat;
