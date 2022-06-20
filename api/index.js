const express = require("express");
const server = express();
const cors = require("cors");
const routes = require("./src/Routes/index");
const indexRegistro = require("./src/Routes/indexRegistro");
const indexAdmin = require("./src/Routes/indexAdmin");
const indexOwner = require("./src/Routes/indexoOwner");
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

server.use(express.json({ limit: "50mb" }));
server.use(express.urlencoded({ limit: "50mb" }));

server.use(express.json());
server.use("/", routes);
server.use("/registro", indexRegistro);
server.use("/admin", indexAdmin);
server.use("/owner", indexOwner);
server.use("/user", indexUser);

db.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log("Server rinning in Port:", process.env.PORT);
  });
});

module.exports = server;
