import React, { useState } from "react";
import APIService from "../../services/APIService";

const StatusForm = () => {
  const [numE, setNumE] = useState("");
  const [idE, setIdE] = useState("");
  const api_service = new APIService();

  const handleStatusChange = () => {
    api_service.patch("reports", numE, idE, "status").then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      <p>Cambiar estado:</p>
      <form>
        <div className="row">
          <div className="col-3">
            <input
              className="form-control"
              type="text"
              onChange={(e) => setNumE(e.target.value)}
              placeholder="ID"
            />
          </div>
          <div className="col-3">
            <select
              className="form-select"
              onChange={(e) => setIdE(e.target.value)}
            >
              <option value="">--Seleccione una opcion--</option>
              <option value="Closed">Cerrado</option>
              <option value="Pending">Pendiente</option>
              <option value="ToDo">Por asignar</option>
              <option value="Testing">Testing</option>
            </select>
          </div>
          <div className="col-2">
            <button
              className="btn btn-outline-secondary"
              onClick={handleStatusChange}
            >
              Cambiar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StatusForm;
