import React, { useState } from "react";
import { useCallback } from "react";
import axios from "axios";
import "./SupportForm.styles.scss";
import { ticketStates } from "../TicketsPage/Tickets.page";

const handleChange = (setFunction) => (newStateEvent) => {
  setFunction(newStateEvent.target.value);
};

export default function SupportFormPage({ history }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [disabled, setDisabled] = useState(false);

  const changeTitle = useCallback(handleChange(setTitle), [setTitle]);
  const changeDescription = useCallback(handleChange(setDescription), [
    setDescription,
  ]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setDisabled(true);

      axios
        .post(
          "https://fieldfind-backend.herokuapp.com/tickets",
          {
            title,
            description,
            state: 2,
            users_permissions_user: sessionStorage.getItem("userId"),
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            },
          }
        )
        .then((response) => {
          history.push("/tickets");
        })
        .catch((error) => {
          // Handle error.
          setDisabled(false);
        });
    },
    [title, description]
  );

  return (
    <>
      <section className="jumbotron">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Título del problema</label>
            <input
              name="title"
              type="text"
              className="form-control"
              id="title"
              placeholder="Problema con..."
              value={title}
              onChange={changeTitle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Mensaje</label>
            <textarea
              name="description"
              className="form-control"
              id="description"
              rows="3"
              placeholder="Ocurrió que..."
              value={description}
              onChange={changeDescription}
            ></textarea>
          </div>

          <button className="btn ticketBtn" type="submit" disabled={disabled}>
            {disabled ? (
              <span
                className="spinner-border spinner-border-sm mr-2"
                role="status"
                aria-hidden="true"
              ></span>
            ) : null}
            Enviar
          </button>
        </form>
      </section>
    </>
  );
}
