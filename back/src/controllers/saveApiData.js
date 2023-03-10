const axios = require("axios");
const { Character } = require("../DB_connection");

const getApiData = async () => {
  try {
    let i = 1;
    let characters = [];

    while (i < 6) {
      //me traigo la información de 5 páginas (20 characters cada una), me traigo todo y después lo trabajo
      let apiData = await axios(
        `https://rickandmortyapi.com/api/character?page=${i}` //esto me devuelve una promesa en cada vuelta del ciclo, el array characters es un array de promesas
      );
      characters.push(apiData); //estoy pusheando una promesa por cada respuesta de la ap,termino teniendo un array con 5 promesas en pending
      i++;
    }
    characters = (await Promise.all(characters)).map(
      (
        res //el promiseAll me devuelve un array entonces lo mapeo, por cada respuesta, mapeo el array de cada respuesta
      ) =>
        res.data.results.map((char) => {
          return {
            //retorno un objeto con cada propiedad que necesito que las establecí en mi modelo
            id: char.id,
            name: char.name,
            status: char.status,
            species: char.species,
            gender: char.gender,
            origin: char.origin.name,
            image: char.image,
          }; //characters como lo mapeamos dos veces obtenemos un array de array de objetos:[[{},{},{ }]]
        })
    ); //una vez que se resuelvan las promesas me devuelve un array que voy a mapear
    // characters.flat(1);
    let allCharacters = [];
    characters.map((char) => {
      allCharacters = allCharacters.concat(char);
    });

    return allCharacters;
  } catch (error) {
    return { error: error.message };
  }
};

const saveApiData = async () => {
  //como voy a tener que llamar y esperar a la otra función que es async necesito una función async que haga el await de lo que me devuelve la otra función
  try {
    let allCharacters = await getApiData(); //esto me retorna un array de objetos
    //  console.log(allCharacters);
    const createCharacters = await Character.bulkCreate(allCharacters); //el método bulk me permite pasarl e un array de objetos y me los crea todos juntos en la bd
    return allCharacters;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { saveApiData, getApiData };
