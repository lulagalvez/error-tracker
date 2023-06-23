import React, { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import APIService from "../../services/APIService";
import "./TicketExpansion.css";

const SoftwareToDevView = () => {
  const [devs, setDevs] = useState([]);
  const [software, setSoftware] = useState([]);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [selectedSoftware, setSelectedSoftware] = useState(null);

  const api_service = new APIService();

  useEffect(() => {
    async function fetchData() {
      try {
        const software_response = await api_service.get("software");
        setSoftware(software_response);

        const devs_response = await api_service.get("devs");
        setDevs(devs_response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleSelectedDeveloper = (selected) => {
    console.log('Selected:',selected);
    setSelectedDeveloper(selected [0])
    console.log('SelectedDev:',selected[0])
  };

  const handleSelectedSoftware = (selected) => {
    setSelectedSoftware(selected[0]);
  };

  const handleAssign = () => {
    if (selectedDeveloper && selectedSoftware) {
        console.log('developer_id',selectedDeveloper.id);
        console.log("software_id", selectedSoftware.id);
      api_service.post("/software_dev/associate", {
        developer_id: selectedDeveloper.id,
        software_id: selectedSoftware.id,
      });
    }
  };

  return (
    <div className="col-6 container mt-4 text-align-center">
      <h1>Asignar desarrollador a proyecto</h1>
      <div className="row">
        <div className="col-4">
          <p className="developer-label">
            Desarrollador: {selectedDeveloper ? selectedDeveloper.name : ""}
          </p>
          <div className="developer-search">
            <Typeahead
              id="developer-select"
              labelKey="name"
              options={devs}
              selected={selectedDeveloper ? [selectedDeveloper] : []}
              onChange={handleSelectedDeveloper}
              placeholder="Seleccionar Desarrollador"
            />
          </div>
        </div>
        <div className="col-4">
          <p className="developer-label">
            Software: {selectedSoftware ? selectedSoftware.name : ""}
          </p>
          <div className="developer-search">
            <Typeahead
              id="software-select"
              labelKey="name"
              options={software}
              selected={selectedSoftware ? [selectedSoftware] : []}
              onChange={handleSelectedSoftware}
              placeholder="Seleccionar Software"
            />
            <div className="top-padding d-flex justify-content-end">
              <button onClick={handleAssign} className="custom-button">
                Asignar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareToDevView;
