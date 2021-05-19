const fs = require("fs");
const express = require("express");
const PORT = 8000;
const TODOS_PATH = "./todos.txt";
const cors = require("cors");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  fs.readFile(TODOS_PATH, "utf8", (err, text) => {
    if (err) {
      return res.status(500).end("Error obtaining todos");
    }

    const todos = text
      .split("\n")
      .filter((todos) => todos)
      .map(JSON.parse);

    console.log(todos);

    res.json(todos);
  });
});

app.post("/", (req, res) => {
  const data = JSON.stringify(req.body);

  fs.appendFile(TODOS_PATH, "\n" + data, (err) => {
    if (err) {
      return res.status(500).end("failed to write to file");
    }

    res.end("Message posted successfully");
  });
});

app.delete("/", (req, res, id) => {
  const deleted = req.body.id === id;
  console.log(deleted);
  res.status(200).end("deleted successfully");
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
