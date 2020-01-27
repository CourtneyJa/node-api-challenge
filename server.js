const express = require("express");
const projectRouter = require("./projects/projectRouter");
const actionRouter = require("./actions/actionRouter");
const server = express();

server.use(express.json());
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", (req, res) => {
  res.send("Holla if you hear me");
});

module.exports = server;
