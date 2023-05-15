import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './BugReportList.css';

const BugReportList = ({ bugReports, onClick, accessLevel, selectedBugId }) => {
  const handleClick = (bugReport) => {
    if (accessLevel > 1) {
      onClick(bugReport);
    }
  };

  const statusColors = {
    Pending: 'status-pending',
    ToDo: 'status-to-do',
    Testing: 'status-testing',
    Closed: 'status-closed',
  };

  return (
    <div className="container bg-gray">
      <div style={{ padding: '0.5rem' }}></div>
      <div className="overflow-auto" style={{ maxHeight: '680px' }}>
        <div className="card-deck overflow-hidden">
          {bugReports.map((bugReport) => {
            const borderColor = statusColors[bugReport.status] || 'gray'; // Provide a default value

            return (
              <div
                key={bugReport.id}
                className={`bg-title-card mb-3 border-0 custom-shadow ${bugReport.id === selectedBugId ? 'selected' : ''}`}
                onClick={() => handleClick(bugReport)}
              >
                <div className="">
                  <div className="p-3 d-flex align-items-center justify-content-between">
                    <div>
                      <h5 className="title">{bugReport.title}</h5>
                      <p className="text-secondary m-0">{bugReport.date}</p>
                    </div>
                    <h6 className="text-secondary m-0">Software: {bugReport.software}</h6>
                    <div>
                      <div className={`card p-1 text-secondary m-0  ${borderColor}`}>{bugReport.status}</div>
                    </div>
                  </div>
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
  );
};

export default BugReportList;
