import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './BugReportList.css';

const BugReportList = ({ bugReports, onClick }) => {
  return (
    <div className="container bg-gray">
      <div className="overflow-auto" style={{ maxHeight: '400px' }}>
        <div className="card-deck">
          {bugReports.map((bugReport) => (
            <div
              key={bugReport.id}
              className="card mb-3"
              onClick={() => onClick(bugReport)} // Call onClick event handler with the bugReport as argument
            >
              <div className="card-body">
                <h5 className="card-title">{bugReport.title}</h5>
                <p className="card-text">{bugReport.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BugReportList;
