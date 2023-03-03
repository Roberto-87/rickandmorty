const express = require("express");
const getCharById = require("../controllers/getCharById");
const getCharDetail = require("../controllers/getCharDetail");
const favs = require("../controllers/favsController");

const router = express.Router();

router.get("/onsearch/:id", getCharById);
router.get("/detail/:id", getCharDetail);
router.post("/rickandmorty/fav", favs);

module.exports = router;
