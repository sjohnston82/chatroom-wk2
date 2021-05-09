import "./App.css";
import React, { useState, useEffect } from "react";
import ChatBox from "./components/ChatBox";
import Name from "./components/Name";
import { io } from "socket.io-client";
import NewMessage from "./components/NewMessage";
const socket = io();

const getRooms = (messages) => {
  const rooms = messages.map((msg) => msg.room);
  const filtered = rooms.filter((room) => room);
  return Array.from(new Set(filtered));
};

const sendMessage = (message) => {
  socket.emit("chat message", message);
};

function App() {
  const [currentRoom, setCurrentRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [username, setUsername] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);

  //SET ALL 'SETUP' LISTENERS/CALLS INSIDE OF USEEFFECT
  //APP() IS INITIALIZED FOR RE-RENDERS, MULTIPLYING LISTENERS
  useEffect(() => {
    socket.on("chat message", (msg) => {
      console.log("message received");
      let messageArr = messages;
      setMessages([...messageArr, msg]);
    });
    socket.on("initial messages", (newMessages) => {
      setRooms(getRooms(newMessages));
      setMessages(newMessages);
    });
  }, [messages]);

  const getThumbs = () => {
    let thumbsArr = [];
    fetch("https://randomuser.me/api/?results=50")
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((r) => thumbsArr.push(r.picture.thumbnail));
        let thumb = Math.floor(Math.random() * 50);
        let thumb1 = thumbsArr[thumb];
        setThumbnail(thumb1);
      });
  };

  return (
    <div className="App">
      <Name
        username={username}
        setUsername={setUsername}
        getThumbs={getThumbs}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
      />
      <ChatBox
        data={messages}
        rooms={rooms}
        setRooms={setRooms}
        currentRoom={currentRoom}
        setCurrentRoom={setCurrentRoom}
        thumbnail={thumbnail}
        username={username}
      />
      {currentRoom ? (
        <NewMessage
          username={username}
          currentRoom={currentRoom}
          sendMessage={sendMessage}
          thumbnail={thumbnail}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
