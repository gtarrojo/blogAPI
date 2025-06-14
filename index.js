const http = require("node:http");
const app = require("./src/app");

require("dotenv").config();

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.on("listening", () => {
  console.log(`server listening on ${PORT}`);
});

server.on("error", (error) => {
  console.log(error);
});
