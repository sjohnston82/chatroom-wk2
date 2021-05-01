/* globals fetch */
var socket = io.connect("http://localhost:8000");

const messageTextField = document.getElementById("message-text");
// const nickname = prompt("Enter your nickname:");

// function postMessage(text, nick, room) {
//   console.log("posting message");
//   fetch("/messages", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ text, nick, room, date: new Date() }),
//   })
//     .then((data) => {
//       console.log("Success:", data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

function getMessages(updateState) {
  return fetch("/messages")
    .then((response) => response.json())
    .then((data) => {
      console.log("fetched data from server");
      updateState("messages", data);
    });
}

module.exports = {
  postMessage,
  getMessages,
};
