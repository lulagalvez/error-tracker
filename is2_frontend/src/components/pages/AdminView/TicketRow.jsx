import React from "react";
import { Status } from "./Status";
import { BotonBorrar } from "./BotonBorrar";
import TicketExpansion from "./TicketExpansion";

const TicketRow = ({ ticket, handleClick, deleteReport, selectedTicket }) => {
  const isTicketSelected = selectedTicket === ticket;
  const rowClassName = isTicketSelected ? "active" : "";
  const formatoFecha=(strFecha)=>{
    const ret = new Date(strFecha);
    return ret.toLocaleDateString();
  }
  const formatoUrg=(strUrg)=>{
    const numUrg=Number(strUrg);
    if(numUrg==1) return "Urgente";
    if(numUrg>=2 && numUrg<=4) return "Alta";
    if(numUrg>=5 && numUrg<=7) return "Media";
    return "Baja";
  }
  return (
    <>
      <tr onClick={() => handleClick(ticket)} className={rowClassName}>
        <td style={{ textAlign: "center" }}>{ticket.id}</td>
        <td style={{ textAlign: "center" }}>{ticket.title}</td>
        <td style={{ textAlign: "center" }}>{ticket.user_name}</td>
        <td style={{ textAlign: "center" }}>{ticket.software_name}</td>
        <td style={{ textAlign: "center" }}>{formatoFecha(ticket.date)}</td>
        <td style={{ textAlign: "center" }}>{formatoFecha(ticket.urgency)}</td>
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
