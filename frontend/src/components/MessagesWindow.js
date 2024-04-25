import React, { useEffect, useRef } from "react";

import {
  isSameSender,
  isLastMessage,
  isSameSenderMargin,
  isSameUser,
} from "../functions/chatFunctions";
import { useUserContext } from "../context/UserContext";

const MessagesWindow = ({ messages }) => {
  const { user } = useUserContext();
  const messageRef = useRef();
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [messages]);
  return (
    <div className="feed" ref={messageRef}>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <img className="message-pic" src={m.sender.pics[0]}></img>
            )}

            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "25em",
                wordWrap: "break-word",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </div>
  );
};

export default MessagesWindow;
