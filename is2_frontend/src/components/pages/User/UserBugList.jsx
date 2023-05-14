import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import BugReportList from './BugReportList';
import CommentColumn from './CommentColumn';
import SideBar from '../Navigation/SideBar';
import {generateBugReports} from '../../utils/generateBugReports'
import './UserReportList.css';


const bugReports = generateBugReports(10);



const UserBugList = () => {
  const [selectedBugReport, setSelectedBugReport] = useState(null);

  const handleBugReportClick = (bugReport) => {
    setSelectedBugReport(bugReport);
  };

  return (
    <div className="container-fluid pt-4">
      <div className="row">
        <div className="col-3">
          <div className="sidebar-wrapper">
            <SideBar />
          </div>
        </div>

        <div className="col">
          <BugReportList bugReports={bugReports} onClick={handleBugReportClick} />
        </div>

        <div className="col">
          {selectedBugReport && <CommentColumn bugReport={selectedBugReport} />}
          {/* Add other columns or components */}
        </div>
      </div>
    </div>
  );
};

export default UserBugList;