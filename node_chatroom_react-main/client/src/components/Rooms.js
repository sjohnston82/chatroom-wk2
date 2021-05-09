import React from "react";
import "../styles/rooms.css";

const Rooms = (props) => {
  let rooms = props.rooms;
  // let setRooms = props.setRooms;
  // let currentRoom = props.currentRoom;
  let setCurrentRoom = props.setCurrentRoom;
  const addRoom = () => {
    let newRoom = prompt("Enter name of new room...");
    rooms.push(newRoom);
    setCurrentRoom(newRoom);
  };
  const handleChange = (event) => {
    setCurrentRoom(event.target.value);
  };

  return (
    <div id="rooms">
      <select onChange={handleChange} name="room" id="room-select">
        <option value="">--Select a Room--</option>
        {rooms.map((room, id) => (
          <option value={room} key={id}>
            {room}
          </option>
        ))}
      </select>
      <p>or</p>
      <button className="addRoomButton" onClick={addRoom}>
        Add a New Room
      </button>
    </div>
  );
};

export default Rooms;
