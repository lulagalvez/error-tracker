import React, { useState } from "react";
import { MDBCol } from "mdbreact";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./TicketExpansion.css";

const TicketExpansion = ({ developers, ticket, handleSubmit, dictSoftwareDev }) => {
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(ticket.priority);
  const [selectedStatus, setSelectedStatus] = useState(ticket.status);
  const [searchValue, setSearchValue] = useState("");

  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleDeveloperChange = (selected) => {
    setSelectedDeveloper(selected[0]);
  };

  const handleAssign = () => {
    var updatedTicket = ticket;
    if (selectedDeveloper) {
      updatedTicket = {
        ...updatedTicket,
        dev_id: selectedDeveloper.id,
        dev_email: selectedDeveloper.email,
        dev_name: selectedDeveloper.name
      };
      /* setTimeout(() => {
        window.location.reload();
      }, 350);  */
    }
    if (selectedStatus) {
      updatedTicket = {
        ...updatedTicket,
        status: selectedStatus
      };
    }
    
  
    console.log("devfilter",filteredDevelopers);
    handleSubmit(updatedTicket);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredDevelopers = developers.filter((developer) => {
    const isMatchingName = developer.name.toLowerCase().includes(searchValue.toLowerCase());
    const isMatchingSoftware = dictSoftwareDev.software_dev.some((softwareDev) => {
      const softwareId = Number(softwareDev.software_id); // Parse software_id as a number
      return softwareDev.dev_id === developer.id && softwareId === ticket.software;
    });
  
    return isMatchingName && isMatchingSoftware;
  });
  
  return (
    <tr>
      <td colSpan="9">
        <div className="row">
          <div className="col-md-6">
            <h6 className="description-title">Description</h6>
            <div className="description-box">
              <div className="description-container">
                <p className="description">{ticket.description}</p>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <p className="priority-label">Prioridad:</p>
            <select
              value={selectedPriority}
              onChange={handlePriorityChange}
              className="form-control"
            >
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
              <option value="Urgente">Urgente</option>
            </select>
          </div>
          <div className="col-md-2">
            <p className="developer-label">Depurador: {ticket.devName}</p>
            <div className="developer-search">
              <Typeahead
                id="developer-select"
                labelKey="name"
                options={filteredDevelopers}
                selected={selectedDeveloper ? [selectedDeveloper] : []}
                onChange={handleDeveloperChange}
                placeholder="Select Developer"
              />
            </div>
          </div>
          <div className="col-md-2">
            <p className="status-label">Estado:</p>
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="form-control"
            >
              <option value="ToDo">Abierto</option>
              <option value="Pending">En progreso</option>
              <option value="Closed">Cerrado</option>
            </select>
            <div className="top-padding d-flex justify-content-end">
            <button onClick={handleAssign} className="custom-button">
              Assign
            </button>
          </div>
          </div>
          
          
        </div>
      </td>
    </tr>
  );
  
};

export default TicketExpansion;
