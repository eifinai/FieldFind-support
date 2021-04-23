import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import "./TicketsPage.styles.scss";

export const ticketStates = {
  1: "success",
  2: "warning",
};

export default function TicketsPage({ history }) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://fieldfind-backend.herokuapp.com/tickets?users_permissions_user=${sessionStorage.getItem(
          "userId"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
        }
      )
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        return;
      });
  }, []);

  const Tickets = useMemo(
    () =>
      tickets.map((ticket, index) => (
        <tr
          key={index}
          onClick={() => {
            history.push(`/tickets/${ticket.id}`);
          }}
        >
          <th scope="row">{ticket.id}</th>
          <td>
            <span
              className={`badge badge-${
                ticketStates[ticket.state.id]
              } py-2 w-100`}
            >
              {ticket.state.state}
            </span>
          </td>
          <td>{ticket.title}</td>
          <td align="center">
            {moment(ticket.updated_at).format("DD/MM/YYYY hh:mm:ss")}
          </td>
          <td align="center">
            {moment(ticket.created_at).format("DD/MM/YYYY hh:mm:ss")}
          </td>
        </tr>
      )),
    [tickets, history]
  );

  return (
    <>
      <section className="jumbotron">
        <div class="row mb-2">
          <h1 className="display-6 mr-auto ml-3">Tickets</h1>
          <Link to="/support" className="btn btn-success ml-auto mr-3">
            Crear nuevo ticket
          </Link>
        </div>
        <table className="table table-bordered table-light tickets-master-table table-responsive">
          <thead className="thead-light">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Estado</th>
              <th scope="col">Mensaje</th>
              <th className="text-center" scope="col">
                Fecha de modificación
              </th>
              <th className="text-center" scope="col">
                Fecha de creación
              </th>
            </tr>
          </thead>
          <tbody>{Tickets}</tbody>
        </table>
      </section>
    </>
  );
}
