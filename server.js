const express = require("express");
const projectRouter = require("./projects/projectRouter");
const actionRouter = require("./actions/actionRouter");
const server = express();

server.use(express.json());
server.use(log);
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", (req, res, next) => {
  res.send("Holla if you hear me");
});

function log(req, res, next) {
  req.time = Date.now();
  console.log(
    `A ${req.method} to ${req.originalUrl} was made at ${req.reqTime}`
  );
  next();
}

module.exports = server;
