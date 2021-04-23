import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./NavBar.styles.scss";
import logo from "../../assets/logo.png";

function NavBar({ match }) {
  const signOut = () => {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("userId");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-style">
      <Link
        to={`${!sessionStorage.getItem("jwt") ? "/" : "/tickets"}`}
        className="navbar-brand"
      >
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top mr-1"
          alt=""
        ></img>
        Field Find
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          {!sessionStorage.getItem("jwt") ? (
            <>
              <li className="nav-item active">
                <Link to="/login" className="nav-link">
                  Iniciar sesión <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/register">
                  Crear cuenta
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item dropdown active">
                <span
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Tickets
                </span>
                <div
                  className="dropdown-menu .dropdown-menu-right"
                  aria-labelledby="navbarDropdown"
                >
                  <Link className="dropdown-item" to="/support">
                    Crear ticket
                  </Link>
                  <Link className="dropdown-item" to="/tickets">
                    Ver tickets
                  </Link>
                </div>
              </li>
              <li className="nav-item active" onClick={signOut}>
                <Link className="nav-link" to="/login">
                  Cerrar sesión
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(NavBar);
