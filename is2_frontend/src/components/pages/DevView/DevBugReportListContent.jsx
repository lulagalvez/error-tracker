import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import "./DevBugReportListContent.css";
import FloatingReasign from "./FloatingReasign";

const DevBugReportListContent = ({
  searchTerm,
  selectedStatus,
  selectedSoftware,
  selectedUrgency,

  statusColors,
  handleClick,
  handleSearch,
  handleStatusChange,
  handleSoftwareChange,
  handleUrgencyChange,

  filteredBugReports,
  statusOptions,
  softwareOptions,
  urgencyOptions,
  accessLevel,
  selectedBugId,
}) => {
  const [showFloatingReasign, setShowFloatingReasign] = useState(false);
  const [selectedTicketTitle, setSelectedTicketTitle] = useState("");
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const handleOpenFloatingReasign = (ticketId, ticketTitle) => {
    setSelectedTicketId(ticketId);
    setSelectedTicketTitle(ticketTitle);
    setShowFloatingReasign(true);
  };

  const handleCloseFloatingReasign = () => {
    setShowFloatingReasign(false);
  };

  const handleSubmitIssue = (issueText) => {
    // Handle submitting the issue text
    console.log("Submitted issue:", issueText);
    handleCloseFloatingReasign();
  };

  return (
    <div className="container">
      <div className="d-flex mb-2">
        {/* SEARCH BAR */}
        <input
          type="text"
          className="form-control mr-1"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />

        {/*CANTIDAD DE ELEMENTOS ENCONTRADOS*/}
        <p className="text-muted m-1"> ({filteredBugReports.length})</p>

        {/* SPACER */}
        <div className="w-100"></div>
        {/* SOFTWARE DROPDOWN MENU */}
        <select
          className="form-control"
          value={selectedSoftware}
          onChange={handleSoftwareChange}
        >
          <option value="">All Software</option>
          {softwareOptions &&
            softwareOptions.map((software) => (
              <option key={software} value={software}>
                {software}
              </option>
            ))}
        </select>

        {/* SPACER */}
        <div className="mx-1"></div>

        {/* PRIORITY DROPDOWN MENU */}
        <select
          className="form-control mr-1"
          value={selectedUrgency}
          onChange={handleUrgencyChange}
        >
          <option value="">All Urgency</option>
          {urgencyOptions &&
            urgencyOptions.map((urgency) => (
              <option key={urgency} value={urgency}>
                {urgency}
              </option>
            ))}
        </select>
        {/* SPACER */}
        <div className="mx-1"></div>

        {/* STATUS DROPDOWN MENU */}
        <select
          className="form-control mr-1"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="">All Status</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/*FLOATING REASIGN WINDOW*/}
      {showFloatingReasign && (
        <FloatingReasign
          title={selectedTicketTitle}
          ticketId={selectedTicketId}
          onClose={handleCloseFloatingReasign}
          onSubmit={handleSubmitIssue}
        />
      )}

      {/*INICIO DE LISTA DE BUGS*/}
      <div className="container bg-gray">
        <div style={{ padding: "0.5rem" }}></div>
        <div className="overflow-auto" style={{ maxHeight: "680px" }}>
          <div className="card-deck overflow-hidden">
            {/*BUG REPORT FILTER*/}
            {filteredBugReports.map((bugReport) => {
              const borderColor = statusColors[bugReport.status] || "gray"; // da valor por defecto
              console.log("b", borderColor);
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
                        <p className="text-secondary m-0">{bugReport.date}</p>
                      </div>
                      {/*SOFTWARE*/}
                      <h6 className="text-secondary m-2">
                        Software: {bugReport.software_name}
                      </h6>
                      <h6 className="text-secondary m-2">
                        Urgency: {bugReport.urgency}
                      </h6>
                      {/* REASIGN BUTTON */}
                      {/* Modificar posteriormente para que sirva para la reasignacion  */}
                      {accessLevel > 1 && (
                        <button
                          className="btn delete-btn"
                          onClick={() =>
                            handleOpenFloatingReasign(
                              bugReport.id,
                              bugReport.title
                            )
                          }
                        >
                          <FontAwesomeIcon
                            icon={faPencilAlt}
                            style={{ color: "red" }}
                          />
                        </button>
                      )}

                      <div>
                        {/*ESTADO, EL MARCO CAMBIA DE COLOR */}
                        <div
                          className={`p-1 text-secondary m-0 ${borderColor} rounded`}
                        >
                          {bugReport.status}
                        </div>
                      </div>
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

export default DevBugReportListContent;
