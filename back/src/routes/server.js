const express = require("express");
const server = express();
const axios = require("axios");
const cors = require("cors");
const getAllChars = require("../controllers/getAllChars");
const postFav = require("../controllers/postFav");
const { saveApiData } = require("../controllers/saveApiData");

server.use(express.json());
server.use(cors);

server.get("/alldb", async (req, res) => {
  try {
    const allDb = await saveApiData();
    res.status(200).json(allDb);
  } catch (error) {
    res.status(404).send("hubo un problema");
  }
});

server.get("/rickandmorty/allcharacters", async (req, res) => {
  try {
    const allCharacters = await getAllChars();
    res.status(200).json(allCharacters);
  } catch (error) {
    res.status(404).send("hubo un problema");
  }
});

server.get("/rickandmorty/character/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    const data = response.data;

    let character = {
      id: data.id,
      name: data.name,
      species: data.species,
      gender: data.gender,
      image: data.image,
    };
    res.status(200).json(character);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

server.get("/rickandmorty/detail/:detailId", async (req, res) => {
  const { detailId } = req.params;

  try {
    const response = await axios(
      `https://rickandmortyapi.com/api/character/${detailId}`
    );
    const data = response.data;

    let characterDetail = {
      id: data.id,
      name: data.name,
      species: data.status,
      gender: data.gender,
      image: data.image,
      species: data.species,
      origin: data.origin.name,
    };
    res.status(200).json(characterDetail);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

server.get("/rickandmorty/fav", (req, res) => {
  res.status(200).json(fav);
});

server.post("/rickandmorty/fav", async (req, res) => {
  try {
    const characterFav = await postFav(req.body);

    if (characterFav.error) throw new Error(characterFav.error);

    res.status(200).json(characterFav);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

server.delete("/rickandmorty/fav/:id", (req, res) => {
  const { id } = req.params;
  fav = fav.filter((favorite) => favorite.id !== Number(id));
  res.status(200).send("el favorito se eliminó correctamente");
});

module.exports = server;
