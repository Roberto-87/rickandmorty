const {
  ADD_FAVORITE,
  DELETE_FAVORITE,
  FILTER,
  ORDER,
  GET_ALL_CHARACTERS,
} = require("./types");

const initialState = {
  myFavorites: [],
  allCharacters: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_FAVORITE:
      return {
        ...state,
        myFavorites: [...state.allCharacters, payload],
        allCharacters: [...state.allCharacters, payload], //me hago una copia de ese estado porque voy a estar filtrando los favoritos y no quiero pisar el estado original sino tener un respaldo el cual poder recuperar => necesitamos dos estados que manejen lo mismo, uno lo vamos a usar para hacer el filtrado sin pisar el original
      };
    case DELETE_FAVORITE:
      return {
        ...state,
        myFavorites: state.myFavorites.filter(
          // es mejor hacerlo en una variable aparte antes del return
          (favorite) => favorite.id !== payload
        ),
      };
    case FILTER:
      const filterGender = state.allCharacters.filter((ch) => {
        return ch.gender === payload;
      });
      return {
        ...state,
        myFavorites: filterGender,
      };
    case ORDER:
      return {
        ...state,
        myFavorites:
          payload === "Ascendente"
            ? state.allCharacters.sort((a, b) => a.id - b.id)
            : state.allCharacters.sort((a, b) => b.id - a.id),
      };
    case GET_ALL_CHARACTERS:
      return {
        ...state,
        allCharacters: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
