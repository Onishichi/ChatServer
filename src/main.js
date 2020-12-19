"use strict";

const express = require("express");
const app = express();

app.set("port", process.env.PORT || 3000);

const server = app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost: ${app.get("port")}`);
});

//セキュリティー的に修正する必要あり
const io = require("socket.io")(server,{
    cors: {
        origin: "*",
    }
});
require("./controllers/chatController")(io);
