// AdminView.js
import React, { useEffect, useState } from "react";
import APIService from "../../services/APIService";
import PriorityForm from "./PriorityForm";
import StatusForm from "./StatusForm";
import "./TablaAdmin.css";
import AdminViewTable from "./AdminViewTable";

function AdminView() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [devs, setDevs] = useState([]);
  const api_service = new APIService();
  const [selectedDev, setSelectedDev] = useState("");
  const [reportFilter, setReportFilter] = useState("");
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
