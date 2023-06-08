import React, { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./TicketExpansion.css";

const TicketExpansion = ({ developers, ticket, updateTicket }) => {
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const handleDeveloperChange = (selected) => {
    setSelectedDeveloper(selected[0]);
  };

  const handleAssignDeveloper = () => {
    if (selectedDeveloper) {
      const updatedTicket = {
        ...ticket,
        assignedDeveloper: selectedDeveloper.id,
      };
      updateTicket(updatedTicket);
      console.log("Assigning developer:", selectedDeveloper);
    }
  };
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredDevelopers = developers.filter((developer) =>
    developer.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <tr>
      <td colSpan="9">
        <h6 className="description-title">Description</h6>
        <div className="description-box">
          <div className="description-container">
            <p className="description">{ticket.description}</p>
          </div>
          <div className="col">
            <div className="developer-section">
              <p className="developer-label">Developer: {ticket.devName}</p>
              <div className="developer-search">
                <Typeahead
                  id="developer-select"
                  labelKey="name"
                  options={filteredDevelopers}
                  selected={selectedDeveloper ? [selectedDeveloper] : []}
                  onChange={handleDeveloperChange}
                  placeholder="Select Developer"
                />
                <button
                  onClick={handleAssignDeveloper}
                  className="btn btn-primary custom-button"
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TicketExpansion;
