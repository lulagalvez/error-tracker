// AdminView.js
import React, { useEffect, useState } from "react";
import APIService from "../../services/APIService";
import SearchBar from "./SearchBar";
import PriorityForm from "./PriorityForm";
import StatusForm from "./StatusForm";
import TicketRow from "./TicketRow";
import TicketExpansion from "./TicketExpansion";
import "./TablaAdmin.css";

function AdminView() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [devs, setDevs] = useState([]);
  const api_service = new APIService();
  const [selectedDev, setSelectedDev] = useState("");
  let devsName = [];

  const showData = async () => {
    try {
      const reportsResponse = await api_service.get("reports");
      console.log("reports", reportsResponse);
      setReports(reportsResponse);

      const devsResponse = await api_service.get("devs");
      console.log("devs", devsResponse);
      setDevs(devsResponse || []); // Ensure devsResponse is not undefined
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAssignDeveloper = (ticket, selectedDeveloper) => {
    if (selectedDeveloper) {
      const updatedTicket = {
        ...ticket,
        assignedDeveloper: selectedDeveloper.id,
      };
      updateTicket(updatedTicket);
      // Handle the logic for assigning the selected developer to the ticket
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let results = [];
  if (!search) {
    results = reports;
  } else {
    results = reports.filter((dato) =>
      dato.title.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  const deleteReport = (report) => {
    if (window.confirm("Estas seguro de que quieres eliminar el reporte?")) {
      api_service.delete("reports", report.id);
      setReports(reports?.filter((item) => item !== report));
    }
  };

  const updateTicket = (updatedTicket) => {
    const updateTicket = async (updatedTicket) => {
      try {
        await api_service.put("reports", updatedTicket.id, updatedTicket);
        setReports(
          reports.map((report) =>
            report.id === updatedTicket.id ? updatedTicket : report
          )
        );
        console.log("Ticket updated successfully:", updatedTicket);
      } catch (error) {
        console.error("Error updating ticket:", error);
      }
    };
  };

  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket === selectedTicket ? null : ticket);
  };

  useEffect(() => {
    showData();
    console.log("right here boss");
  }, []);

  return (
    <div className="container mt-4">
      <h1>Vista de lista de bugs</h1>
      <hr />
      {/* <SearchBar search={search} handleSearch={handleSearch} />
      <br />
      <PriorityForm api_service={api_service} />
      <br />
      <StatusForm api_service={api_service} />
      <br /> */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Tracking ID</th>
            <th scope="col">Titulo</th>
            <th scope="col">Usuario</th>
            <th scope="col">Software</th>
            <th scope="col">Fecha</th>
            <th scope="col">Prioridad</th>
            <th scope="col">Depurador</th>
            <th scope="col">Estado</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {results &&
            results.map((ticket, key) => (
              <React.Fragment key={key}>
                <TicketRow
                  ticket={ticket}
                  handleClick={handleTicketClick}
                  deleteReport={deleteReport}
                  selectedTicket={selectedTicket}
                />
                {selectedTicket === ticket && (
                  <TicketExpansion
                    developers={devs}
                    ticket={ticket}
                    updateTicket={handleAssignDeveloper}
                  />
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminView;
