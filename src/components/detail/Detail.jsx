import {useParams, Link}from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Detail(props){
   const[character, setCharacter]=useState({})
   
    const {detailId}= useParams() //use params me retorna un objeto

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/${detailId}`)
          .then((response) => response.json())
          .then((char) => {
            if (char.name) {
              setCharacter(char);
            } else {
              window.alert("No hay personajes con ese ID");
            }
          })
          .catch((err) => {
            window.alert("No hay personajes con ese ID");
          });
        return setCharacter({});
      }, [detailId]);

    return(
      <>
      <div>
          {/* <Link to='/home'> Home </Link> */}
        <div>
        <h2 >{character?.name}</h2>
       <img src={character?.image} alt={character.name} />
        <h2>Gender: {character?.gender}</h2>
        <h2 >Species: {character?.species}</h2>
        <p>Status: {character?.status}</p>
        <p>Origin: {character?.origin?.name}</p>
        <div>
        </div>
        </div>
      </div>
      </>
    )
}