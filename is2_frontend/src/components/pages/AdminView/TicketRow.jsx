import React from "react";
import { Status } from "./Status";
import { BotonBorrar } from "./BotonBorrar";
import TicketExpansion from "./TicketExpansion";

const TicketRow = ({ ticket, handleClick, deleteReport, selectedTicket }) => {
  const isTicketSelected = selectedTicket === ticket;
  const rowClassName = isTicketSelected ? "active" : "";

  return (
    <>
      <tr onClick={() => handleClick(ticket)} className={rowClassName}>
        <td style={{ textAlign: "center" }}>{ticket.id}</td>
        <td style={{ textAlign: "center" }}>{ticket.title}</td>
        <td style={{ textAlign: "center" }}>{ticket.user_name}</td>
        <td style={{ textAlign: "center" }}>{ticket.software_name}</td>
        <td style={{ textAlign: "center" }}>{ticket.date}</td>
        <td style={{ textAlign: "center" }}>{ticket.urgency}</td>
        <td style={{ textAlign: "center" }}>{ticket.dev_name}</td>
        <td>
          <Status nombre={ticket.status} />
        </td>
        <td>
          <BotonBorrar report={ticket} deleteReport={deleteReport} />
        </td>
      </tr>
    </>
  );
};

export default TicketRow;
