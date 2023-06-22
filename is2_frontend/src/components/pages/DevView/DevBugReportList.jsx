import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./DevBugReportList.css";
import DevBugReportListContent from "./DevBugReportListContent";

const DevBugReportList = ({
  bugReports,
  onClick,
  accessLevel,
  selectedBugId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSoftware, setSelectedSoftware] = useState("");
  const [selectedUrgency, setSelectedUrgency] = useState("");


  /*ESTADOS POSIBLES DE UN TICKET PARA ASIGNARLES EL COLOR EN EL .CSS*/
  const statusColors = {
    Pending: "status-pending",
    ToDo: "status-to-do",
    Testing: "status-testing",
    Closed: "status-closed",
  };

  const handleClick = (bugReport) => {
    if (accessLevel > 1) {
      onClick(bugReport);
    }
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

  const filteredBugReports = bugReports.filter((bugReport) => {
    const title = bugReport.title.toString().toLowerCase();
    const status = bugReport.status.toString().toLowerCase();
    const software = bugReport.software.toString().toLowerCase();
    const urgency = bugReport.urgency.toString().toLowerCase();
    const isMatchingUrgency = selectedUrgency
      ? bugReport.urgency === selectedUrgency.toLowerCase()
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
      isMatchingSoftware
    );
  });

  const statusOptions = Object.keys(statusColors);
  const softwareOptions = [
    ...new Set(bugReports.map((bugReport) => bugReport.software)),
  ];
  const urgencyOptions = [
    ...new Set(bugReports.map((bugReport) => bugReport.urgency)),
  ];

  return (
    <DevBugReportListContent
      searchTerm={searchTerm}
      selectedStatus={selectedStatus}
      selectedSoftware={selectedSoftware}
      selectedUrgency={selectedUrgency}

      statusColors={statusColors}
      handleClick={handleClick}
      handleSearch={handleSearch}
      handleStatusSearch={handleStatusChange}
      handleSoftwareChange={handleSoftwareChange}
      handleUrgencyChange={handleUrgencyChange}

      filteredBugReports={filteredBugReports}
      statusOptions={statusOptions}
      softwareOptions={softwareOptions}
      urgencyOptions={urgencyOptions}
      accessLevel={accessLevel}
      selectedBugId={selectedBugId}
    />
  );
};

export default DevBugReportList;
