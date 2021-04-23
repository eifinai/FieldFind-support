import React, { useState, useCallback } from "react";
import Logo from "../../assets/logo.png";
import "./LogInForm.styles.scss";
import axios from "axios";
import { withRouter } from "react-router";

const handleChange = (setFunction) => (newStateEvent) => {
  setFunction(newStateEvent.target.value);
};

function LoginForm({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const changeEmail = useCallback(
    (email) => {
      handleChange(setEmail)(email);
      setErrors({ ...errors, email: false });
    },
    [setEmail, errors]
  );
  const changePassword = useCallback(handleChange(setPassword), [setPassword]);

  const handleSubmit = useCallback(
    (event) => {
      if (password) {
        setDisabled(true);
        event.preventDefault();
        axios
          .post("https://fieldfind-backend.herokuapp.com/auth/local", {
            identifier: email,
            password: email,
          })
          .then((response) => {
            sessionStorage.setItem("jwt", response.data.jwt);
            sessionStorage.setItem("userId", response.data.user.id);
            history.push("/tickets");
          })
          .catch((error) => {
            setErrors({ ...errors, email: true });
            setDisabled(false);
          });
      }
    },
    [email, password, errors, history]
  );

  return (
    <div className="login-form-component">
      <img className="LogoImage" src={Logo} alt="logo" />
      <h1>Inicio de sesión</h1>
      <form className="formStyle" onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{color: '#A1A4A7'}} className="labelStyle" htmlFor="email">
            Correo electrónico
          </label>
          <input
            name="email"
            type="email"
            className="form-control formInput"
            id="email"
            placeholder="nombre@ejemplo.com"
            value={email}
            onChange={changeEmail}
          />
        </div>
        <div className="form-group">
          <label style={{color: '#A1A4A7'}} className="labelStyle" htmlFor="password">
            Contraseña
          </label>
          <input
            name="password"
            type="password"
            className={`form-control formInput ${
              errors.email ? "is-invalid" : ""
            }`}
            id="password"
            value={password}
            onChange={changePassword}
          />
          {errors.email ? (
            <div className="invalid-feedback">
              Correo o contraseña incorrecta
            </div>
          ) : null}
        </div>
        <button
          className="btn btn-primary logInBtn"
          type="submit"
          disabled={disabled}
        >
          {disabled ? (
            <span
              className="spinner-border spinner-border-sm mr-2"
              role="status"
              aria-hidden="true"
            ></span>
          ) : null}
          Iniciar sesión
        </button>
        <p className = "textToLink" >¿No tienes una cuenta de Field Find? <a style= {{color: 'white'}} className = "hyperlink" href="/register">Registrate</a></p>
      </form>
    </div>
  );
}

export default withRouter(LoginForm);
