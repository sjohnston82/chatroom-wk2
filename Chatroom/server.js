const http = require("http");
const { parse } = require("querystring");
const portNumber = 8000;
const file = require("./messages.json");
const fs = require("fs");
const url = require("url");
const users = ["Steve", "Jack"];

randomUser = function (users) {
  return users[Math.floor(Math.random() * users.length)];
};
const zeroes = (x) => {
  return (x < 10 ? "0" : "") + x;
};
timestamp = function (time) {
  let date = new Date(time);
  let y = date.getFullYear();
  let m = zeroes(date.getMonth() + 1);
  let d = zeroes(date.getDate());
  let h = zeroes(date.getHours());
  let min = zeroes(date.getMinutes());
  let result = `${y}-${m}-${d} ${h}:${min}`;
  return result;
};
messageView = function (file) {
  let username = file.username;
  let timeposted = timestamp(file.timePosted);
  let content = file.message;
  let output = `
${username}
${timeposted}
${content}
    `;
  return output;
};
messageList = function (file) {
  for (newObj = [], i = 0; i < file.length; i++) {
    newObj.push(messageView(file[i]));
  }
  return newObj;
};
htmlView = function (file) {
  for (newObj = [], i = 0; i < file.length; i++) {
    newObj.push(`<li> ${messageView(file[i])}</li>`);
  }
  return newObj;
};

const server = http.createServer((req, res) => {
  let newUrl = new URL(`http://localhost:${portNumber}${req.url}`);

  if (req.url === "/messages" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    let results = JSON.stringify(messageList(file))
      .split("\\n")
      .join("\n")
      .split('","')
      .join("")
      .split('["')
      .join("")
      .split('"]')
      .join("");
    let htmlCode = JSON.stringify(htmlView(file))
      .split("\\n")
      .join("<br>")
      .split('","')
      .join("")
      .split('["')
      .join("")
      .split('"]')
      .join("");
    res.end(`
    <!doctype html>
    <html>
    <head>
      <script type="text/javascript">
        function onDocumentReady(){
          const form = document.querySelector("form");
          form.addEventListener("submit", submitHandler);

          function submitHandler(event) {
            event.preventDefault();
            const data = new FormData(event.target);
            const value = Object.fromEntries(data.entries());
            console.log(value);
          }
        }
      </script>
    </head>
    <body>
        <div class = "messages">
          ${htmlCode}
        </div>
        <form action="/messages" method="post">
            <label for="username">Username</label>
            <input type="text" name="username" /><br />

            <label for="message">Message</label>
            <input type="text" name="message" /><br />
            <button>Save</button>
        </form>
    </body>
    </html>
`);
  } else if (req.url === "/messages" && req.method === "POST") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const postDate = new Date().getTime();
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      // let message = JSON.parse(`{ "${postDate}": "${body}" }`);
      const randoUser = randomUser(users);
      let message = JSON.parse(
        `{"username":"${randoUser}", "timePosted": ${postDate}, "message": "${body}"}`
      );
      console.log(randoUser);
      fs.readFile("./messages.json", function (err, data) {
        if (err) throw err;
        let json = JSON.parse(data);
        json.push(message);
        fs.writeFile("./messages.json", JSON.stringify(json), function (err) {
          if (err) throw err;
          // console.log(JSON.stringify(json));
        });
        res.statusCode = 200;
        res.end("Message posted successfully");
      });
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ Message: "Route not found" }));
  }
});

// function submitHandler(event) {
//   event.preventDefault();
//   const data = new FormData(event.target);
//   const value = Object.fromEntries(data.entries());
//   console.log(value);
// }

// const form = document.querySelector("form");
// form.addEventListener("submit", submitHandler);

server.listen(portNumber, () => console.log(`listening on port ${portNumber}`));
