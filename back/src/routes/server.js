/* const http = require("http");
const getCharById = require("../controllers/getCharById");
const getCharDetail = require("../controllers/getCharDetail");

http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.url.includes("onsearch")) {
      let id = req.url.split("/").at(-1);
      getCharById(res, id);
    }
    if (req.url.includes("detail")) {
      let id = req.url.split("/").at(-1);
      getCharDetail(res, id);
    }
  })
  .listen(3001, "localhost");
 */

const express = require("express");
const server = express();
const PORT = 3001;
const router = require("../routes/index");
server.use(express.json);
server.use("/", router);

server.listen(PORT, () => {
  console.log(`server raised on port ${PORT}`);
});
