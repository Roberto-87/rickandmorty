import {  useState} from 'react'
import style from './Form.module.css'
import validation from './validation'


export default function Form({login}){
     
    const[userData, setUserData]= useState({
        username: '',
        password: ''
       })
    
    const [errors, setErrors]= useState({
        username:'',
        password:''
    })
      
    
    const handleInputChange=(event)=>{
        setUserData({
            ...userData,  [event.target.name]:event.target.value
        }) 
        setErrors(validation({
            ...userData,
            [event.target.name]:event.target.value
        })
      )
     }   
          
    const handleSubmit=(e)=>{
        e.preventDefault()
        login(userData)
        
    }
    
        return(
            <form className={style.containerForm} onSubmit={handleSubmit}>
                <label htmlFor="username">username:</label>
                <input type="text" value={userData.username} name='username' onChange={handleInputChange} />
                {errors.username && <p>{errors.username}</p>}

                <label htmlFor="password">Password:</label>
                <input type="pasword" value={userData.password} name='password' onChange={handleInputChange}/>
                {errors.password && <p>{errors.password}</p>}

                <button >Login</button>
            </form>
        )
    }




