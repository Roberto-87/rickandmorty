import {Card} from '../card/Card';
import style from './Cards.module.css'

export default function Cards({characters, onClose}) {

   return( 
   <div className={style.divContainer}>
      {
         characters && characters.map((character, index)=> 
         <Card key={index} name= {character.name} 
         species={character.species} 
         gender={character.gender}
         image={character.image} 
         id={character.id}
         onClose={()=>onClose(character.id)}/>
   ).reverse()
      }
   </div>)
}
