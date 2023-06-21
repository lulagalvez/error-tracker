
import React, { useEffect, useState } from "react";
import APIService from "../../services/APIService";
import PriorityForm from "./PriorityForm";
import StatusForm from "./StatusForm";
import Filter from "./Filter";
import TicketRow from "./TicketRow";
import TicketExpansion from "./TicketExpansion";
import "./TablaAdmin.css";

function AdminView() {
  const [reports, setReports] = useState([]);
  const [devs, setDevs] = useState([]);
  const [devsCount, setDevsCount] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSoftware, setSelectedSoftware] = useState("");
  const [selectedUrgency, setSelectedUrgency] = useState("");
  const [selectedFilterDev,setSelectedFilterDev] = useState("");    
  const [dictSoftwareDev, setDictSoftwareDev] = useState("");
  const api_service = new APIService();
  const statusColors = {
    Pending: "status-pending",
    ToDo: "status-to-do",
    Testing: "status-testing",
    Closed: "status-closed",
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSoftwareChange = (event) => {
    setSelectedSoftware(event.target.value);
  };

  const handleUrgencyChange = (event) => {
    setSelectedUrgency(event.target.value);
  };
  const handleFilterDevChange = (event) => {
    setSelectedFilterDev(event.target.value);
  };  
  const devRecommendation = () =>{
    const developersWithCount = Object.entries(devsCount).map(([id, count]) => ({
      id,
      count: count || 0
    }));
    const sortedDevs= devs.sort((a,b) => {
      const countA = developersWithCount.find(dev => dev.id === a.id).count;
      const countB = developersWithCount.find(dev => dev.id === b.id).count;
      return countA - countB;
    })
    console.log("devCount",devsCount);
    setDevs(sortedDevs);
  };
  const filteredBugReports = reports.filter((reports) => {
    const title = reports.title.toString().toLowerCase();
    const status = reports.status.toString().toLowerCase();
    const software = reports.software_name?.toString().toLowerCase();
    const developer = reports.dev_name?.toString().toLowerCase();
    const urgency = reports.urgency.toString().toLowerCase();
    const isMatchingUrgency = selectedUrgency
      ? urgency === selectedUrgency.toLowerCase()
      : true;
      const isMatchingDev = selectedFilterDev
      ? developer === selectedFilterDev.toLowerCase()
      : true;
    const isMatchingTitle = title.includes(searchTerm.toLowerCase());
    const isMatchingStatus = selectedStatus
      ? status === selectedStatus.toLowerCase()
      : true;
    const isMatchingSoftware = selectedSoftware
      ? software === selectedSoftware.toLowerCase()
      : true;
    return (
      isMatchingUrgency &&
      isMatchingTitle &&
      isMatchingStatus &&
      isMatchingSoftware &&
      isMatchingDev
    );
  },[]);
  const statusOptions = Object.keys(statusColors);
  const softwareOptions = [
    ...new Set(reports.map((reports) => reports.software_name)),
  ];
  const urgencyOptions = [
    ...new Set(reports.map((reports) => reports.urgency)),
  ];
  const devOptions = [
    ...new Set(reports.map((reports) => reports.dev_name)),
  ];

  const showData = async () => {
    try {
      const reportsResponse = await api_service.get("reports");
      console.log("reports", reportsResponse);
      setReports(reportsResponse);

      const devsCountResponse= await api_service.get("count_notclosed_bug_reports");
      console.log("devcounts", devsCountResponse);
      setDevsCount(devsCountResponse || []);

      const devsResponse = await api_service.get("devs");
      console.log("devs", devsResponse);
      setDevs(devsResponse || []); // Ensure devsResponse is not undefined

    const sortedDevs = devsResponse.sort((a, b) => {
      const countA = devsCountResponse[a.id] || 0;
      const countB = devsCountResponse[b.id] || 0;
      return countA - countB;
    });
    setDevs(sortedDevs);
    const devSoftwareResponse = await api_service.get("software_dev");
    console.log("software_dev", devSoftwareResponse);
    setDictSoftwareDev(devSoftwareResponse);


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /* const handleAssignDeveloper = (ticket, selectedDeveloper) => {
    if (selectedDeveloper) {
      const updatedTicket = {
        ...ticket,
        assignedDeveloper: selectedDeveloper.id,
      };
      updateTicket(updatedTicket);
      // Handle the logic for assigning the selected developer to the ticket
    }
  }; */


  const deleteReport = (report) => {
    if (window.confirm("Estas seguro de que quieres eliminar el reporte?")) {
      api_service.delete("reports", report.id);
      setReports(reports?.filter((item) => item !== report));
    }
  };

  const updateTicket = (updatedTicket) => {
    const updateTicket = async () => {
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
    updateTicket();
  };

  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket === selectedTicket ? null : ticket);
  };

  useEffect(() => {
    showData();
  }, []);
  useEffect(() => {
    if (devs.length > 0 && devsCount.length > 0) {
      devRecommendation();
    }
  }, [devs, devsCount]);

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
        <Filter searchTerm={searchTerm}
        selectedStatus={selectedStatus}
        selectedSoftware={selectedSoftware}
        selectedUrgency={selectedUrgency}
        selectedFilterDev={selectedFilterDev}
        filteredBugReports={filteredBugReports}
        handleSearch={handleSearch}
        handleStatusChange={handleStatusChange}
        handleSoftwareChange={handleSoftwareChange}
        handleUrgencyChange={handleUrgencyChange} 
        handleFilterDevChange={handleFilterDevChange}
        statusOptions={statusOptions}
        softwareOptions={softwareOptions}
        urgencyOptions={urgencyOptions}
        devOptions={devOptions}/>      
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
          {filteredBugReports &&
            filteredBugReports.map((ticket, key) => (
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
                    handleSubmit={updateTicket}
                    dictSoftwareDev={dictSoftwareDev}
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
