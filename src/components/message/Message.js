import React from "react";

import "./Message.css";

export default function Message(props) {
  return (
    <div className={`message-box message-box-${props.position}`}>
      <div className="message-content">{props.message}</div>
      <p className="message-name">{props.name}</p>
    </div>
  );
}
