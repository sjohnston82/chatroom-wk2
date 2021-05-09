import React from "react";
import "../styles/MessageLine.css";
const MessageLine = (props) => {
  let message = props.data;
  // console.log('rendering message line')
  return (
    <div
      className={
        message.nick == props.username ? "message-item-you" : "message-item"
      }
    >
      {message.nick != props.username ? (
        <div className="left-col">
          <span className="nick">{message.nick}</span>
          <img className="thumbnail" src={message.thumbnail} alt="weee" />
        </div>
      ) : (
        ''
      )}
      <div className="text">
        <span>{message.text}</span>
        <span className="date">{new Date(message.date).toLocaleString()} </span>
      </div>
      <div className="date-div">
      </div>
    </div>
  );
};

export default MessageLine;
