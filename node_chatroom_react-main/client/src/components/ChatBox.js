import MessageLine from "./MessageLine";
import React from "react";
import Rooms from "./Rooms";
import "../styles/ChatBox.css";
// function getRooms(messages, currentRoom) {
//     const rooms = messages.map(msg => msg.room)
//     rooms.push(currentRoom) // we have to add the currentRoom to the list, otherwise it won't be an option if there isn't already a message with that room
//     const filtered = rooms.filter(room => room) // filter out undefined or empty string
//     return Array.from(new Set(filtered)) // filters out the duplicates
// }
const ChatBox = (props) => {
  let messages = props.data;
  let rooms = props.rooms;
  let currentRoom = props.currentRoom;
  let setCurrentRoom = props.setCurrentRoom;
  // console.log('rendering chatbox')
  // console.log(messages)
  return (
    <div className="chatbox-div">
      <div className="rooms-div">
        <Rooms
          rooms={rooms}
          setRooms={props.setRooms}
          currentRoom={currentRoom}
          setCurrentRoom={setCurrentRoom}
          getMessages={props.getMessages}
          numMessages={props.numMessages}
          page={props.page}
          setPage={props.setPage}
        />
      </div>
      {currentRoom ? (
        <ul className="message-container" id="messages">
          {messages
            .filter((msg) => msg.room === currentRoom)
            .map((msg, id) => (
              <MessageLine
                className="message-line"
                data={msg}
                key={id}
                thumbnail={props.thumbnail}
                username={props.username}
              />
            ))}
        </ul>
      ) : (
        <div>Select A Room To Begin Your Chat Experience!</div>
      )}
      {currentRoom === "" ? (
        <div></div>
      ) : (
        <div>
          <button
            onClick={() => {
              props.setPage(props.page - 1);
              props.getMessages(currentRoom, props.page, props.numMessages);
            }}
            disabled={props.page === 1 ? true : false}
          >
            Left
          </button>
          <button
            onClick={() => {
              props.setPage(props.page + 1);
              props.getMessages(currentRoom, props.page, props.numMessages);
            }}
          >
            Right
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
