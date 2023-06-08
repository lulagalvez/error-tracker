import React, { useState } from "react";
import APIService from "../../services/APIService";

const PriorityForm = () => {
  const [numP, setNumP] = useState("");
  const [idP, setIdP] = useState("");
  const api_service = new APIService();

  const handlePriorityChange = () => {
    api_service.patch("reports", numP, idP, "priority").then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="ms-3">
      <p>Cambiar prioridad:</p>
      <form>
        <div className="row">
          <div className="col-3">
            <input
              className="form-control"
              type="text"
              onChange={(e) => setNumP(e.target.value)}
              placeholder="ID"
            />
          </div>
          <div className="col-3">
            <input
              className="form-control"
              type="number"
              onChange={(e) => setIdP(e.target.value)}
              placeholder="Prioridad"
              min="1"
              max="6"
            />
          </div>
          <div className="col-2">
            <button
              className="btn btn-outline-secondary"
              onClick={handlePriorityChange}
            >
              Cambiar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PriorityForm;
