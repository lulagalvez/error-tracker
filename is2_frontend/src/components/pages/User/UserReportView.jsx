import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import BugReportList from './BugReportList';
import CommentColumn from './CommentColumn';
import SideBar from '../../props/Navigation/SideBar';
import { generateBugReports } from '../../utils/generateBugReports';
import './UserReportView.css';


//Aqui tienen que estar los hooks de los bugreports, hasta el momento solo son generados en una funcion en utils, es un diccionario
//dentro del codigo se usa status en vez de state, cambiar referencia en el json
const bugReports = generateBugReports(10);

const UserReportView = () => {
  const [selectedBugId, setSelectedBugId] = useState(null);

  const handleBugReportClick = (bugReport) => {
    setSelectedBugId(bugReport.id);
  };

  const accessLevel = 2;
  const columnPadding = "p-5";
  return (
    <div className="container-fluid pt-4">
      
      <div className="row">
        <div className="col-1 ">
          
          <div className="sidebar-wrapper">
            <SideBar />
          </div>
        </div>
        <div className="col">
          <div className="row">
            <div className="col">
              <div className="p-5"></div>
            </div>
          </div>
          <BugReportList
            bugReports={bugReports}
            onClick={handleBugReportClick}
            accessLevel={accessLevel}
            selectedBugId={selectedBugId}
          />
        </div>
        <div className="col-5">
          <div className="row">
            <div className="col">
              <div className="p-5"></div>
            </div>
          </div>
          <div className=' CommentColumn px-5'>{selectedBugId &&  <CommentColumn  bugReport={bugReports.find(bugReport => bugReport.id === selectedBugId)} />}</div>
          
          {/* Add other columns or components */}
        </div>
      </div>
    </div>
  );
};

export default UserReportView;
