import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import React, { useState } from "react";

function ChatComponent() {
  const [messages, setMessages] = useState([
    {
      message: "Hello my friend",
      sentTime: "just now",
      sender: "Joe",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const userMessage = {
      message: inputMessage,
      sentTime: "just now",
      sender: "You",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const url = "http://localhost:5005/chatbot/";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ history: [inputMessage] }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send message");
          }
          return response.json();
        })
        .then((data) => {
          console.log("databack", data["response"]);

          setMessages((prevMessages) => [
            ...prevMessages,
            {
              message: data["response"],
              sentTime: "just now",
              sender: "Bot",
            },
          ]);

          // 清空输入框
          setInputMessage("");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error:", error);
      // 在發生錯誤時可以進行錯誤處理，比如顯示錯誤提示
    }
  };

  return (
    <div style={{ position: "relative", height: "500px", width: "500px" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((msg, index) => (
              <Message
                key={index}
                model={{
                  message: msg.message,
                  sentTime: msg.sentTime,
                  sender: msg.sender,
                  direction: msg.sender === "You" ? "outgoing" : "incoming",
                }}
              />
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            value={inputMessage}
            onChange={(value) => {
              console.log("Input value:", value);
              setInputMessage(value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default ChatComponent;