// import express from "express";
const express = require("express");
const app = express();
const port = 8000;
// import path from "path";
const path = require("path");
// import fs from "fs";
const fs = require("fs");
const file = "./public/todos.txt";
const bodyParser = require("body-parser");

// const __dirname = process.env.PWD;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/todo", function (req, res) {
  fs.readFile(file, "utf8", function (err, data) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
    let splitData = data.split("\n");
    splitData.filter((data) => data);
    res.send(JSON.stringify(splitData));
  });
});

app.listen(port, () => console.log("listening on" + port));
