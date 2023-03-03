import SearchBar from "../searchBar/SearchBar"
import logo from './logo.png'
import style from './Nav.module.css'
import {Link} from 'react-router-dom'

const Nav =({onSearch})=>{
    return(
        <nav className={style.navContainer}>
            <Link to='home'>
            <div className={style.containerLogo}>
            <img className={style.logo} src={logo} alt='logo rick and morty' />
            </div>
            </Link>
            
            <SearchBar onSearch={onSearch}/>
            <Link className={style.navLink} to='home'>Home</Link>
            <Link className={style.navLink} to='favorites'>Favorites</Link>
            <Link className={style.navLink} to='about'>About</Link>
            <Link className={style.navLink} to='/'>Logout</Link>
        </nav>
    )
}

export default Nav 