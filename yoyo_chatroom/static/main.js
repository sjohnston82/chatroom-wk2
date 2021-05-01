const yo = require("yo-yo");
const inputBar = document.getElementById("input-bar");
const inputBtn = document.getElementById("input-btn");
const rooms = document.getElementById("rooms");
const filters = document.getElementById("filters");
const filterBtn = document.getElementById("filter-btn");
const newRoomInput = document.getElementById("new-room");
const newRoomBtn = document.getElementById("new-room-btn");
const username = prompt("Enter your username");
// const roomNames = ["General", "Sports", "Comedy"];\

// window.onload = interval;

const addNewRoom = () => {
  const newRoom = newRoomInput.value;
  let test = yo`<option value="${newRoom}">${newRoom}</option>`;
  let test1 = yo`<option value="${newRoom}">${newRoom}</option>`;
  rooms.appendChild(test);
  filters.append(test1);
  newRoomInput.value = "";
  postRooms(newRoom);
};

const roomsInTxt = [];
function appendRoom() {
  let listItems = roomsInTxt.map((r) => r);
  console.log(listItems);
  // getRooms();
  // console.log(roomsInTxt);
  roomsInTxt.forEach((room) => {
    if (!listItems.includes(room)) {
      let filterList = yo`<option value="${room}">${room}</option>`;
      let postList = yo`<option value="${room}">${room}</option>`;
      filters.append(filterList);
      rooms.appendChild(postList);
    }
  });
}
getRooms();
// appendRoom();
newRoomBtn.addEventListener("click", addNewRoom);
const getRoom = (messages) => {
  const currRoom = filters.value;
  yo.update(el, messageList(messages, currRoom));
};

const filterHandler = (e) => {
  e.preventDefault();
  getMessages();
};

const submitHandler = (event) => {
  event.preventDefault();
  console.log(rooms.value);
  const room = rooms.value;
  const text = inputBar.value;
  postMessage(username, text, room);
  inputBar.value = "";

  let newList = messageList(messages, update, currRoom);
  yo.update(el, newList);
};

function interval() {
  setInterval(() => {
    getMessages();
  }, 3000);
}

filterBtn.addEventListener("click", filterHandler);
inputBtn.addEventListener("click", submitHandler);

var date = new Date();
var dateStr =
  ("00" + (date.getMonth() + 1)).slice(-2) +
  "/" +
  ("00" + date.getDate()).slice(-2) +
  "/" +
  date.getFullYear() +
  " " +
  ("00" + date.getHours()).slice(-2) +
  ":" +
  ("00" + date.getMinutes()).slice(-2) +
  ":" +
  ("00" + date.getSeconds()).slice(-2);

const currRoom = filters.value;
const messagesDiv = document.getElementById("messages-div");
const messages = [];
var el = messageList(messages, update, currRoom);

function messageList(messages) {
  return yo`<ul>
  ${messages.map((message) => {
    return yo`<li><p>${message.room}</p><p>Author: ${message.username}</p><p>Message: ${message.text}</p><p>Posted at:${message.date}</p></li>`;
  })}
  </ul>`;
}

function update() {
  messages.push(message);
  const currRoom = filters.value;
  let newList = messageList(messages, update);
  yo.update(el, newList);
}

messagesDiv.appendChild(el);

function postMessage(username, text, room) {
  console.log("posting message");
  fetch("http://localhost:8000/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      username: username,
      text: text,
      date: dateStr,
      room: room,
    }),
  })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getMessages() {
  const currRoom = filters.value;
  fetch("http://localhost:8000/messages", {
    method: "GET",
    headers: { "Access-Control-Allow-Origin": "*" },
  })
    .then((response) => response.json())
    .then((data) => {
      getRoom(data.filter((message) => message.room === currRoom));
      // console.log(data);
    });
}
function getRooms() {
  fetch("http://localhost:8000/rooms", {
    method: "GET",
    headers: { "Access-Control-Allow-Origin": "*" },
  })
    .then((response) => response.json())
    .then((data) => {
      let parsedData = data
        .replace(/\r/g, "")
        .split("\n")
        .filter((room) => room)
        .forEach((room) => {
          if (!roomsInTxt.includes(room)) {
            roomsInTxt.push(room);
          }
        });
      appendRoom();
      // roomsInTxt.push(newRooms);
    });
}

function postRooms(room) {
  console.log("posting message");
  fetch("http://localhost:8000/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      room: room,
    }),
  })
    .then((data) => {
      console.log("Success:", data);
      getRooms();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

getMessages();
