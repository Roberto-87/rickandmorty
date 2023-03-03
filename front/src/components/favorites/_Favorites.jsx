import { connect, useDispatch } from "react-redux";
import style from '../favorites/_Favorites.module.css'
import { Link } from "react-router-dom";
import { filterCards, orderCards } from "../../redux/actions";
import Card from "../card/Card";

const Favorite=({myFavorites})=>{
  const dispatch= useDispatch()
  
  const onHandlerOrder=(event)=>{
      dispatch(orderCards(event.target.value))
    }
    const onHandlerFilter=(event)=>{
      dispatch(filterCards(event.target.value))
  
    }


    return(
        <div >   

            <ul >
                <div >
                 <select onChange={onHandlerOrder}>
                        <option value={"order"} disabled="disabled">Order By</option>
                        <option value="Ascendente">Ascendente</option>
                        <option value="Descedente">Descedente</option>
                </select>
                 <select onChange={onHandlerFilter}>
                         <option value={"filter"} disabled="disabled">Filter By</option>
                        <option value="Male"> Male</option>
                        <option value="Female">Female</option>
                        <option value="Genderless">Genderless</option>
                        <option value="Unknown">Unknown</option>
                  </select>
                </div>
                <ul className={style.favoriteContainer}>
            {
                myFavorites.map((favorite)=>{
                    return <Card
                    key= {favorite.id}
                    id={favorite.id}
                    name={favorite.name}
                    species={favorite.species}
                    gender={favorite.gender}
                    image= {favorite.image}
                    onClose={favorite.onClose}

                    />


                })
            }

                </ul>
            </ul>
        </div>  
    )          
}


export const mapStateToProps=(state)=>{
    return{
        myFavorites: state.myFavorites
    }
}

export default connect(mapStateToProps,null)(Favorite)