const fs = require("fs");
const express = require("express");
const { Server } = require("socket.io");

const app = express();

app.use(express.static("static"));
app.use(express.json());

module.exports = function (deps) {
  // app.get("/messages", (req, res) => {
  //   fs.readFile(deps.messagesPath, "utf8", (err, text) => {
  //     if (err) {
  //       return res.status(500).end("Error reading messages");
  //     }

  //     const messages = text
  //       .split("\n")
  //       .filter((txt) => txt) // will filter out empty string
  //       .map(JSON.parse);

  //     res.json(messages);
  //   });
  // });

  // app.post("/messages", (req, res) => {
  //   const data = JSON.stringify(req.body);

  //   fs.appendFile(deps.messagesPath, "\n" + data, (err) => {
  //     if (err) {
  //       return res.status(500).end("failed to write to file");
  //     }

  //     res.end("Message posted successfully");
  //   });
  // });

  const sendMessages = () => {
    fs.readFile(deps.messagesPath, "utf8", (err, text) => {
      if (err) {
        return res.status(500).end("Error reading messages");
      }

      const messages = text
        .split("\n")
        .filter((txt) => txt) // will filter out empty string
        .map(JSON.parse);
      console.log("sending messages");
      io.emit("initial messages", messages);
    });
  };

  const getMessagesByRoom = (roomStr, callback, page, numMessages) => {
    fs.readFile(deps.messagesPath, "utf8", (err, text) => {
      console.log("reading file");
      if (err) {
        return res.status(500).end("Error reading messages");
      }

      const messages = text
        .split("\n")
        .filter((txt) => txt) // will filter out empty string
        .map(JSON.parse)
        .filter((message) => message.room === roomStr);

      // console.log("getMessagesByRoom")
      // console.log(messages)
      callback(messages, page, numMessages);
    });
  };
  const generatePage = (roomArr, page, numMessages) => {
    console.log("generatePage");
    // console.log(roomArr)
    let output = roomArr.slice(
      page !== 1 ? numMessages * (page - 1) : 0,
      page !== 1 ? numMessages * (page - 1) + numMessages : numMessages
    );
    console.log(output);
    io.emit("room messages", JSON.stringify(output));
  };
  const server = require("http").createServer(app);
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("a user connected");
    sendMessages();
    socket.on("room messages", (msg) => {
      // console.log(msg)
      let roomRequest = msg.room;
      let page = msg.page;
      let numMessages = msg.numMessages;
      console.log(roomRequest, page, numMessages);
      console.log("room messages");
      getMessagesByRoom(roomRequest, generatePage, page, numMessages);
    });
    socket.on("chat message", (msg) => {
      // console.log('message: ' + msg)
      const data = JSON.stringify(msg);
      console.log(data);
      io.emit("chat message", msg);
      console.log("sent message");

      fs.appendFile(deps.messagesPath, "\n" + data, (err) => {
        if (err) {
          console.log("failed to write to file");
        }
      });
    });
  });

  return server;
};
