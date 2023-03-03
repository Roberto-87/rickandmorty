const express = require("express");
const server = express();
const PORT = 3001;
const axios = require("axios");

server.listen(PORT, () => console.log(`server raised on port ${PORT}`));

const getCharDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    const data = response.data;
    let character = {
      id: data.id,
      name: data.name,
      species: data.species,
      image: data.image,
      gender: data.gender,
      origin: data.origin,
    };
    character
      ? res.status(200).json({ character })
      : res.status(500).json({ error: "No se encontró el personaje buscado" });
  } catch (error) {
    res.status(404).json({ error: `error ${error}` });
  }
};

module.exports = getCharDetail;
