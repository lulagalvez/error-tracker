import React, { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./TicketExpansion.css";

const ReassignationExpansion = ({ reassignation, handleSubmit, developers, handleRemove }) => {
    const [selectedDeveloper, setSelectedDeveloper] = useState(null);

    const handleDeveloperChange = (selected) => {
        setSelectedDeveloper(selected[0]);
    };

    const handleAssign = () => {
        if (selectedDeveloper) {
            handleSubmit(selectedDeveloper);
        }
    };

    const handleReject = () => {
        handleRemove(reassignation);
    };


    return (
        <tr>
            <td colSpan="4">
                <div className="row">
                    <div className="col-md-6">
                        <h6 className="description-title">Razón de reasignación</h6>
                        <div className="description-box">
                            <div className="description-container">
                                <p className="description">{reassignation.content}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <p className="developer-label">Depurador: {reassignation.dev_name}</p>
                        <div className="developer-search">
                            <Typeahead
                                id="developer-select"
                                labelKey="name"
                                options={developers}
                                selected={selectedDeveloper ? [selectedDeveloper] : []}
                                onChange={handleDeveloperChange}
                                placeholder="Select Developer"
                            />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="top-padding d-flex justify-content-end">
                            <button onClick={handleAssign} className="custom-button">
                                Asignar
                            </button>

                        </div>

                    </div>
                    <div className="col-md-2">
                        <div className="top-padding d-flex ">
                            <button onClick={handleReject} className="custom-button-reject">
                                Rechazar
                            </button>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );

};

export default ReassignationExpansion;
