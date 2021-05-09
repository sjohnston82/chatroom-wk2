import React, { useState } from "react";
import "../styles/NewMessage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const NewMessage = (props) => {
  let sendMessage = props.sendMessage;
  const [newMsg, setNewMsg] = useState({
    text: "",
    room: props.currentRoom,
    date: new Date(),
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    sendMessage({
      text: newMsg.text,
      room: props.currentRoom,
      date: newMsg.date,
      nick: props.username[0],
      thumbnail: props.thumbnail,
    });
    setNewMsg({ ...newMsg, text: "" });
    console.log(newMsg.room);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setNewMsg({ ...newMsg, text: value });
  };

  return (
    <div className="new-msg-div">
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="new-Msg">New message: </label> */}
        <input
          type="text"
          onChange={handleChange}
          placeholder="Enter a new message"
          value={newMsg.text}
          name="new-Msg"
          id="new-Msg"
        />
        <span onClick={handleSubmit} id="submit-icon">
          <FontAwesomeIcon
            icon={faPaperPlane}
            value={{ color: "navy", size: 42 }}
          />
        </span>
      </form>
    </div>
  );
};

export default NewMessage;
