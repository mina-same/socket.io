const path = require("path");
const express = require("express");
const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.set("public", "./public");
app.use(express.static(path.join(__dirname , "public")));

io.on("connection", (socket) => {

  socket.on("newUser", (username) => {
    socket.broadcast.emit("update", username + " has joined the chat");
  });

  socket.on("exitUser", (username) => {
    socket.broadcast.emit("update", username + " has left the chat");
  });

  socket.on("chat", (message) => {
    socket.broadcast.emit("chat", message);
  });

});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

server.listen(1000, () => {
  console.log("Server is running on port 1000");
});
