import {
  ADD_FAVORITE,
  DELETE_FAVORITE,
  FILTER,
  GET_ALL_CHARACTERS,
  ORDER,
} from "./types";
import axios from "axios";

export const addFavorite = async (character) => {
  try {
    const response = axios.post("http://localhost:3001/rickandmorty/fav");
    const data = response.data;
    return {
      type: ADD_FAVORITE,
      payload: data,
    };
  } catch (error) {
    console.log("error");
  }
};

export const deleteFavorite = (id) => {
  try {
    const response = axios.post(`http://localhost:3001/rickandmorty/fav/${id}`);
    const data = response.data;
    return {
      type: DELETE_FAVORITE,
      payload: data.id,
    };
  } catch (error) {
    console.log("error");
  }
};

export const filterCards = (gender) => {
  return {
    type: FILTER,
    payload: gender,
  };
};

export const orderCards = (id) => {
  return {
    type: ORDER,
    payload: id,
  };
};

export const getAllCharacters = () => {
  return async function () {
    let response = await axios.get("https://rickandmortyapi.com/api/character");
    return {
      type: GET_ALL_CHARACTERS,
      payload: response.data,
    };
  };
};
