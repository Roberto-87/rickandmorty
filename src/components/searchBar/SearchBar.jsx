import { useState } from 'react';
import style from './SearchBar.module.css'

export default function SearchBar({onSearch}) {
   const [character, setCharacter]= useState('') 

   const onHandlerInput=(event)=>{
        setCharacter(event.target.value)
   }

   return ( 
      <div className={style.containerSearchBar}>
          <input className={style.inputSearch} type='search' value={character} onChange={onHandlerInput}  placeholder='ingresá un número'/> {/* ojo!!!! recordar que el value tiene que hacer referencia al estado */}
         <button className={style.buttonAdd} onClick={()=>onSearch(character)}>Agregar</button> 
      </div>
   );
}
//las props van siempre desde los padres a los hijos, en cambio, los eventos van desde los hijos a los padres. En searchBar puedo tener un evento cuya función esté en app