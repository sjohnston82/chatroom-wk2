const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const fs = require("fs");
const st = require("st");
const socket = require("socket.io");

const port = 8000;
const MESSAGES_PATH = "./messages.txt";

const server = app.listen(port);
var io = socket(server);

app.use(express.static(path.join(__dirname, "static")));
app.use(express.json());

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat", (msg) => {
    io.emit("chat", msg);
    console.log(msg);
    fs.appendFile(MESSAGES_PATH, "\n" + JSON.stringify(msg), (err) => {
      if (err) return console.error(err);
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "static/index.html");
});

app.get("/messages", (req, res) => {
  fs.readFile(MESSAGES_PATH, "utf8", (err, text) => {
    if (err) {
      res.statusCode = 500;
      return res.end("Error reading messages");
    }

    const messages = text
      .split("\n")
      .filter((txt) => txt)
      .map(JSON.parse);

    return res.json(messages);
  });
});

