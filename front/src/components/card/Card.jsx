import { connect } from 'react-redux';
import style from './Card.module.css'
import {Link, useLocation, useParams} from 'react-router-dom'
import { addFavorite, deleteFavorite } from '../../redux/actions'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export function Card({onClose, name, id, species,gender,image,  }) {
   const dispatch= useDispatch()
   const[isFav, setIsFav]= useState(false)
   const myFavorites= useSelector((state)=>state.myFavorites)
    const handleFavorite=()=>{
       if(isFav){
          setIsFav(false)
          dispatch(deleteFavorite(id))
          
       }else { 
          setIsFav(true)
          dispatch(addFavorite({name, id, species,gender,image })) //es la función que recibo por prop NO es la action
       }
    }
const{pathname}=useLocation()
console.log(pathname)

    useEffect(()=>{
      myFavorites.forEach((favorite)=>{
         if(favorite.id===id){
            setIsFav(true)
         }
      })
    },[myFavorites])

return (
      <div className={style.cardContainer}>
         {
            isFav? (
            <button onClick={handleFavorite}>❤️ </button>
            ):(
            <button onClick={handleFavorite}>🤍 </button>
            )   
         }
          <img className={style.img} src={image} alt="" /> 
         <div className={style.containerCardBody}>
           {pathname!=="/favorites" &&
            <button className={style.close} onClick={onClose}>X</button>
         }
            <div className={style.containerName}>
            <Link to={`/detail/${id}`}>
            <h2 className={style.name}>{name}</h2>
            </Link>
            </div>
            <div className={style.containerCardFooter}>
            <h2 className={style.gender}>{gender}</h2>
            <h2 className={style.specie}>{species}</h2>
            </div>
         </div>
      </div>
   );
}

/* const mapDispatchToProps=(dispatch)=>{
   return {
      addFavorite: (character)=>{dispatch(addFavorite(character))}, //la action es la que está dentro del dispatch
      removeFavorite: (id)=>{dispatch(deleteFavorite(id))} 
   }
} */  //{newFavorite: fn, removeFavorite:fn}
/* 
const mapStateToProps=(state)=>{
   return{
      myFavorites: state.myFavorites
   }
} */

export default Card