import React, { useEffect, useState, useContext } from "react";
import io from "socket.io-client";

import { Context } from "../../context/Context";
import Message from "../../components/message";

import paperPlane from "../../assets/paper-plane-regular.svg";
import "./Chat.css";

const ENDPOINT = "https://falacomigobb.herokuapp.com/";
const socket = io.connect(ENDPOINT);

export default function Chat() {
  const [state, setState] = useState({ message: "", messages: [], name: "" });
  const [typing, setTyping] = useState();
  const context = useContext(Context);

  useEffect(() => {
    if (context.room && context.user)
      socket.emit("join", { name: context["user"], room: context["room"] });

    return () => {
      if (context.name && context.user)
        socket.emit("disconnected", {
          name: context["user"],
          room: context["room"],
        });
    };
  }, [context]);

  useEffect(() => scrollToBottom(), [state.messages]);

  socket.on("message", (message) => {
    setState({
      ...state,
      messages: [
        ...state["messages"],
        { ...message, id: state["messages"].length },
      ],
    });
  });

  socket.on("typing", ({ name }) => setTyping(name));

  socket.on("stop typing", () => setTyping(""));

  function scrollToBottom() {
    const messagesContainer = document.querySelector(".messages-container");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function handleChange(e) {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
    socket.emit("typing", { name: context["user"] });
    setTimeout(() => {
      socket.emit("stop typing");
    }, 1000);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (state["message"] !== "") {
      socket.emit("message", {
        name: context["user"],
        message: state["message"],
      });

      setState({
        ...state,
        message: "",
        messages: [
          ...state["messages"],
          {
            message: state["message"],
            name: context["user"],
            id: state["messages"].length,
          },
        ],
      });
    }
  }

  return (
    <div className="App">
      <main>
        <div className="messages-container">
          {state["messages"].map(({ message, name, id }) => {
            const position =
              name.trim().toLowerCase() === context["user"].trim().toLowerCase()
                ? "right"
                : "left";
            return (
              <Message
                message={message}
                name={name}
                position={position}
                key={id}
              />
            );
          })}
        </div>
        <form className="message-form">
          <p className="user-typing">
            {typing ? `${typing} is typing...` : ""}
          </p>
          <input
            className="message-input"
            placeholder="type your message here..."
            name="message"
            value={state["message"]}
            onChange={handleChange}
          ></input>
          <button className="send-btn" onClick={handleSubmit}>
            <span className="hidden">send</span>
            <img src={paperPlane} alt="paper plane" className="send-image" />
          </button>
        </form>
      </main>
    </div>
  );
}
