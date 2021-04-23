import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./HomePage.styles.scss";

export default function HomePage() {
  return (
    <section className="jumbotron home-page containerStyles">
      <h1 className="display-4 mb-4" style={{ fontSize: "5vw" }}>
        Bienvenido a la página de soporte de FieldFind.
      </h1>
      <div className="flex-row-center">
        <div className="w-75 mt-15">
          <p>
            Si estás visitando esta página, es porque tuviste algún problema.
            Estamos aquí para ayudarte.
          </p>

          <h4 style={{ fontSize: "3vw" }}>
            <b>¿Qué es Field Find?</b>
          </h4>
          <p>
          Field Find es una app móvil que te permitira reservar espacios deportivos para tu recreacion!.
          </p>

          <h4 style={{ fontSize: "3vw" }}>
            <b>Funcionalidades de esta página</b>
          </h4>
          <ul>
            <li>Creación de tickets</li>
            <li>Visualización de tickets creados</li>
            <li>Soporte técnico 24/7</li>
          </ul>
          <Link to="/login" className="btn btn-primary logInBtn">
            Iniciar Sesión
          </Link>
        </div>
        <img src={Logo} id="HomeLogo" alt="Logo Field Find" />
      </div>
    </section>
  );
}
