/* globals prompt */
const { getMessages, postMessage } = require("./fetch-messages");
const { Chat } = require("./components");
const yo = require("yo-yo");
const io = require("../node_modules/socket.io/client-dist/socket.io.js");

let chatDiv = document.getElementById("chat-container");

const nickname = prompt("Enter your nickname:");
var socket = io();

const sendForm = document.getElementById("send-message");
const messageTextField = document.getElementById("message-text");

const input = messageTextField.value;

sendForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const msg = {
    text: messageTextField.value,
    nick: nickname,
    room: state.room,
    date: new Date(),
  };
  socket.emit("chat", msg);
  messageTextField.value = "";
});

socket.on("chat", function (msg) {
  state.messages.push(msg);
  updateState("messages", state.messages);
});

const state = {
  room: "",
  messages: [],
};

function updateState(key, value) {
  state[key] = value;
  yo.update(el, Chat(state.messages, state.room, updateState));
}
console.log(state.messages);
const el = Chat(state.messages, state.room, updateState);
const chatContainer = document.getElementById("chat-container");
chatContainer.appendChild(el);

getMessages(updateState);
