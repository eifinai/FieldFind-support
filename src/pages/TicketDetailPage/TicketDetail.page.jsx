import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import TicketResponse from "../../components/TicketResponse/TicketResponse.component";
import "./TicketDetail.styles.scss";
import { ticketStates } from "../TicketsPage/Tickets.page";

export default function TicketDetail({ match }) {
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://fieldfind-backend.herokuapp.com/tickets/${match.params.ticketId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
        }
      )
      .then((response) => {
        setTicket(response.data);
      })
      .catch((error) => {
        // Handle error.
      });
  }, []);

  return (
    <div className="container">
      <div className="card ticket-container">
        {ticket ? (
          <>
            <div className="card-body">
              <h1 className="card-title">{ticket.title}</h1>
              <h6 className="card-subtitle mb-2 text-muted">
                <span
                  className={`badge badge-${
                    ticketStates[ticket.state.id]
                  } mt-2 mr-1`}
                >
                  {ticket.state.state}
                </span>{" "}
                Ticket #{ticket.id}
              </h6>
              <p className="card-text">{ticket.description}</p>
              <p class="card-text">
                <small class="text-muted">
                  Abierto por {ticket.users_permissions_user.username}, el
                  {" " +
                    moment(ticket.created_at).format("DD/MM/YYYY hh:mm:ss")}
                </small>
              </p>
            </div>
          </>
        ) : (
          <div className="progress w-100 mb-4">
            <div
              className="progress-bar bg-success w-100 progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow="100"
              aria-valuemin="100"
              aria-valuemax="100"
              width="100%"
            />
          </div>
        )}
      </div>
      {ticket && ticket.response ? (
        <div className="response">
          <TicketResponse
            updated_at={ticket.updated_at}
            response={ticket.response}
          />
        </div>
      ) : null}
    </div>
  );
}
