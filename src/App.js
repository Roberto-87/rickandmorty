import { useState, useEffect } from "react";
import "./App.css";
import Cards from "./components/cards/Cards.jsx";
import Nav from "./components/nav/Nav";
import About from "./components/about/About";
import Detail from "./components/detail/Detail";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Form from "./components/form_/Form";
import Favorite from "./components/favorites/_Favorites";

function App() {
  const [characters, setCharacters] = useState([]);
  const [access, setAccess] = useState(false);

  let username = "";
  let password = "";
  const navigate = useNavigate();
  //las props van siempre desde los padres a los hijos, en cambio, los eventos van desde los hijos a los padres. En searchBar puedo tener un evento cuya función esté en app
  const onSearch = (character, input) => {
    fetch(`https://rickandmortyapi.com/api/character/${character}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.name && !noRepeat(data.id)) {
          setCharacters((oldChars) => [...oldChars, data]);
        } else {
          window.alert("No hay personajes con ese ID");
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

  const location = useLocation();

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
