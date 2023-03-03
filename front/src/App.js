import { useState, useEffect } from "react";
import "./App.css";
import Cards from "./components/cards/Cards.jsx";
import Nav from "./components/nav/Nav";
import About from "./components/about/About";
import Detail from "./components/detail/Detail";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Form from "./components/form_/Form";
import Favorite from "./components/favorites/_Favorites";
import { useDispatch, useSelector } from "react-redux";
import { getAllCharacters } from "./redux/actions";

function App() {
  const [characters, setCharacters] = useState([]);
  const [access, setAccess] = useState(false);
  const location = useLocation();

  let username = "";
  let password = "";
  const navigate = useNavigate();

  const onSearch = (character) => {
    fetch(`http://localhost:3001/rickandmorty/onsearch/${character}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.name && !noRepeat(data.id)) {
          setCharacters((oldChars) => [...oldChars, data]);
        } else {
          alert("No hay personajes con ese ID");
        }
      });
  };

  const noRepeat = (id) => {
    setCharacters(characters.filter((character) => character.id !== id));
  };

  const onClose = (id) => {
    setCharacters(characters.filter((character) => character.id !== id));
  };

  const login = (userData) => {
    if (userData.username === username && userData.password === password) {
      setAccess(true);
      navigate("/home"); //el estado access cambia a true y redirigimos al user a /home
    }
  };

  useEffect(() => {
    //esto nos mantiene en la ruta principal(la del form) a menos que ingresemos la data correcta excepto que primero se cumpla la condicional que valida user y pass y entonces nos llevará a /home
    !access && navigate("/");
  }, [access]); //se queda escuchando porque el user va ir cambiando los datos que ingrese

  return (
    <div className="App" style={{ padding: "25px" }}>
      {location.pathname === "/" ? (
        <Form login={login} />
      ) : (
        <Nav onSearch={onSearch} />
      )}
      <Routes>
        <Route
          path="home"
          element={<Cards characters={characters} onClose={onClose} />}
        />
        <Route path="about" element={<About />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="detail/:detailId" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
