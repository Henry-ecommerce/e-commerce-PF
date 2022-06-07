const express = require("express");
const server = express();
const cors = require("cors");
const routes = require("./src/Routes/index");
const indexRegistro = require("./src/Routes/indexRegistro");
const indexAdmin = require("./src/Routes/indexAdmin");
const indexUser = require("./src/Routes/indexUser");
const { db } = require("./src/db");

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use(cors());
server.use(express.json());
server.use("/", routes);
server.use("/registro", indexRegistro);
server.use("/admin", indexAdmin);
server.use("/user", indexUser);
const PORT = process.env.PORT || 4000;
db.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log("Server rinning in Port:", process.env.PORT);
  });
});

module.exports = server;
