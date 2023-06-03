import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import BugReportList from "./BugReportList";
import CommentColumn from "../../props/CommentColumn";
import SideBarUser from "../Sidebars/SidebarUser";
import { generateBugReports } from "../../utils/generateBugReports";
import "./UserReportView.css";
import APIService from '../../services/APIService';
import Cookies from 'js-cookie';


//Aqui tienen que estar los hooks de los bugreports, hasta el momento solo son generados en una funcion en utils, es un diccionario
//dentro del codigo se usa status en vez de state, cambiar referencia en el json

const UserReportView = () => {
  const [selectedBugId, setSelectedBugId] = useState(null);
  const [bugReports, setReports] = useState([]);
  const[softwareName,setSoftwareName]= useState([]);
  const user_email = Cookies.get('email');

  const api_service = new APIService();

  useEffect(() => {
    async function fetchData() {
      const response = await api_service.get('user_reports', user_email);
      setReports(response);
    }
    fetchData();
  }, []); 

  const handleBugReportClick = (bugReport) => {
    setSelectedBugId(bugReport.id);
  };

  const accessLevel = 2;
  const columnPadding = "p-5";
  return (
    <div className="container-fluid pt-4">
      <div className="row">
        <div className="col-2 ">
          {/*SIDEBAR CON UNA COLUMNA ASIGNADA*/}
          <div className="sidebar-wrapper">
            {/* <SideBar /> */}
          </div>
        </div>
        <div className="col-5">
          <div className="row">
            <div className="col">
              <div className="p-4"></div>
            </div>
          </div>
          {/*BUG REPORT CON EL RESTO DE LAS COLUMNAS */}
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
          {/*COLUMNA DE COMENTARIOS CON 5 COLUMNAS ASIGNADAS*/}
          <div className=" CommentColumn px-5">
            {selectedBugId && (
              <CommentColumn
                bugReport={bugReports.find(
                  (bugReport) => bugReport.id === selectedBugId
                )}
              />
            )}
          </div>

          {/* Add other columns or components */}
        </div>
      </div>
    </div>
  );
};

export default UserReportView;
