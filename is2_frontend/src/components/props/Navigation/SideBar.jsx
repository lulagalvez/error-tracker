import React from 'react';
import { FaHome, FaUser, FaCog, FaEnvelope } from 'react-icons/fa';
import { FaChartBar, FaFile, FaTicketAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="position-fixed h-100 d-flex flex-column justify-content-center">
      {/* Sidebar */}
      <div className="d-flex" id="wrapper">
        <div className="bg-light" id="sidebar-wrapper">
          <div className="list-group list-group-flush">
            <a href="#" className="list-group-item list-group-item-action d-flex flex-column align-items-center">
              <FaFile size={24} />
              <span className="mt-1">New Report</span>
            </a>
            <a href="#" className="list-group-item list-group-item-action d-flex flex-column align-items-center">
              <FaTicketAlt size={24} />
              <span className="mt-1">My Reports</span>
            </a>
            <a href="#" className="list-group-item list-group-item-action d-flex flex-column align-items-center">
              <FaUser size={24} />
              <span className="mt-1">Account</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
