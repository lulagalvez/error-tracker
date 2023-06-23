import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./BugReportList.css";

/*INIT, PIDE LOS BUGREPORTS, EL REPORTE CLICKEADO, EL NIVEL DE ACCESO Y LA ACCION DE SELECCION */
const BugReportList = ({ bugReports, onClick, accessLevel, selectedBugId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSoftware, setSelectedSoftware] = useState("");

  const handleClick = (bugReport) => {
    if (accessLevel > 1) {
      onClick(bugReport);
    }
  };

  /*ESTADOS POSIBLES DE UN TICKET PARA ASIGNARLES EL COLOR EN EL .CSS*/
  const statusColors = {
    Pending: "status-pending",
    ToDo: "status-to-do",
    Testing: "status-testing",
    Closed: "status-closed",
  };

  const statusTranslations = {
    Pending: 'Pendiente',
    ToDo: 'En progreso',
    Testing: 'En testeo',
    Closed: 'Cerrado',
    // Add more translations as needed
  };

  /*HANDLER DE BUSQUEDA */

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSoftwareChange = (event) => {
    setSelectedSoftware(event.target.value);
  };

  const filteredBugReports = bugReports.filter((bugReport) => {
    const title = bugReport.title.toString().toLowerCase();
    const status = bugReport.status.toString().toLowerCase();
    const software = bugReport.software_name.toString().toLowerCase();
    const isMatchingTitle = title.includes(searchTerm.toLowerCase());
    const isMatchingStatus = selectedStatus
      ? status === selectedStatus.toLowerCase()
      : true;
    const isMatchingSoftware = selectedSoftware
      ? software === selectedSoftware.toLowerCase()
      : true;
    return isMatchingTitle && isMatchingStatus && isMatchingSoftware;
  });

  const statusOptions = Object.keys(statusColors);
  const softwareOptions = [
    ...new Set(bugReports.map((bugReport) => bugReport.software_name)),
  ];
  const formatoFecha=(strFecha)=>{
    const ret = new Date(strFecha);
    return ret.toLocaleDateString();
  }
  return (
    <div className="container">
      <div className="d-flex mb-2">
        {/* SEARCH BAR */}
        <input
          type="text"
          className="form-control mr-1"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearch}
        />

        {/*CANTIDAD DE ELEMENTOS ENCONTRADOS*/}
        <p className="text-muted m-1"> ({filteredBugReports.length})</p>

        {/* SPACER */}
        <div className="w-100"></div>

        {/* STATUS DROPDOWN MENU */}
        <select
          className="form-control mr-1"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="">Estado</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        {/* SPACER */}
        <div className="mx-1"></div>

        {/* SOFTWARE DROPDOWN MENU */}
        <select
          className="form-control"
          value={selectedSoftware}
          onChange={handleSoftwareChange}
        >
          <option value="">Software</option>
          {softwareOptions.map((software) => (
            <option key={software} value={software}>
              {software}
            </option>
          ))}
        </select>
      </div>

      {/*INICIO DE LISTA DE BUGS*/}
      <div className="container bg-gray">
        <div style={{ padding: "0.5rem" }}></div>
        <div className="overflow-auto" style={{ maxHeight: "680px" }}>
          <div className="card-deck overflow-hidden">
            {/*BUG REPORT FILTER*/}
            {filteredBugReports.map((bugReport) => {
              const borderColor = statusColors[bugReport.status] || "gray"; // da valor por defecto

              return (
                /*ON CLICK HANDLER*/
                <div
                  key={bugReport.id}
                  className={`bg-title-card mb-3 border-0 custom-shadow ${
                    bugReport.id === selectedBugId ? "selected" : ""
                  }`}
                  onClick={() => handleClick(bugReport)}
                >
                  {/*CONTENIDO DE CADA TICKET*/}
                  <div className="">
                    <div className="p-3 d-flex align-items-center justify-content-between">
                      <div>
                        {/*TITULO*/}
                        <h5 className="title">{bugReport.title}</h5>
                        <p className="text-secondary m-0">{formatoFecha(bugReport.date)}</p>
                      </div>
                      {/*SOFTWARE*/}
                      <h6 className="text-secondary m-0">
                        Software: {bugReport.software_name}
                      </h6>
                      <div>
                        {/*ESTADO, EL MARCO CAMBIA DE COLOR */}
                        <div
                          className={`p-1 text-secondary m-0 ${borderColor} rounded`}
                        >
                          {statusTranslations[bugReport.status]}
                        </div>
                      </div>
                    </div>
                    {/*DESCRIPCION*/}
                    <div className="p-2 bg-card-gray">
                      <p className="text">{bugReport.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BugReportList;
