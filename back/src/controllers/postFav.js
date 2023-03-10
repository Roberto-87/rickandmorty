const { Favorite } = require("../models/Favorite");

const postFav = async (character) => {
  try {
    const { name, status, species, gender, origin, image } = character; //recibo character desde la ruta que está en el server
    if (!name || !status || !species || !gender || !origin || !image)
      throw new Error("faltan datos obligatorios");
    const newFav = {
      name,
      status,
      species,
      gender,
      origin,
      image,
    };

    const newCharacter = await Favorite.create(newFav);
    return newCharacter;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = postFav;
