(function () {
  console.log("hello world")
  const app = document.querySelector(".app");
  const socket = io();

  let uName = "";

  app.querySelector("#join-user").addEventListener("click", () => {
    let username = app.querySelector("#username").value;

    if (username) {
      socket.emit("newUser", username);

      uName = username;

      app.querySelector(".join-screen").classList.remove("active");

      app.querySelector(".chat-screen").classList.add("active");
    } else {
      alert("Please enter a username");
    }
  });

  app.querySelector("#send-message").addEventListener("click", () => {
    let message = app.querySelector("#message-input").value;
    if(message) {
      renderMessage("my", {text: message, username: uName});

      socket.emit("chat", {text: message, username: uName}); 

      app.querySelector("#message-input").value = "";
    }
  });

  app.querySelector(".chat-screen .exit-chat").addEventListener("click", () => {
    socket.emit("exitUser", uName);

    window.location.href = window.location.href;

    app.querySelector(".chat-screen").classList.remove("active");

    app.querySelector(".join-screen").classList.add("active");
  });

  socket.on("update", (message) => {
    renderMessage("update", {text: message});
  });

  socket.on("chat", (message) => {
    renderMessage("other", message); 
  });

  function renderMessage(type, message) {

    let msgContainer = app.querySelector(".chat-screen .messages");

    if (type == "my") {
      let element = document.createElement("div");
      element.setAttribute("class", "message my-message");
      element.innerHTML = `
      <div>
        <div class="name"> you </div>
        <div class="text"> ${message.text}</div>
      </div>`;
      msgContainer.appendChild(element);
    }

    else if (type == "other") {
      let element = document.createElement("div");
      element.setAttribute("class", "message other-message");
      element.innerHTML = `
      <div>
        <div class="name"> ${message.username} </div>
        <div class="text"> ${message.text}</div>
      </div>`;
      msgContainer.appendChild(element);
    }

    else if (type == "update") {
      let element = document.createElement("div");
      element.setAttribute("class", "message update");
      element.innerText = `${message.text}`;
      msgContainer.appendChild(element);
    }

    // Scroll to bottom
    msgContainer.scrollTop = msgContainer.scrollHeight - msgContainer.clientHeight;

  }



})();
