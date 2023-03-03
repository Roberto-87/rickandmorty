const validation = (userData) => {
  let errors = {};

  if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(userData.username)) {
    errors["username"] = "el usuario tiene que ser un email";
  }
  if (!userData.username) {
    errors["username"] = "este campo no puede estar vacío";
  }
  if (userData.username.length > 35) {
    //username
    errors["username"] =
      "el nombre de usuario no puede superar los 35 caracteres";
  }

  if (!/\d+/.test(userData.password)) {
    errors["password"] = "la contraseña tiene que tener al menos un número.";
  }
  if (userData.password.length < 6 || userData.password.length > 10) {
    errors["password"] =
      "la contraseña tiene que tener una longitud entre 6 y 10 caracteres";
  }
  return errors;
};

export default validation;
