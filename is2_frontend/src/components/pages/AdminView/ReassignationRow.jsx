import React from "react";
import moment from "moment";
import 'moment/locale/es'

const ReassignationRow = ({ reassignation, handleClick, selectedReassignation }) => {
  const isReassignationSelected = selectedReassignation === reassignation;
  const rowClassName = isReassignationSelected ? "active" : "";  
  
  var tiempoDesde = moment(reassignation.date);
  tiempoDesde.locale('es');
  
  return (
    <>
      <tr  onClick={() => handleClick(reassignation)} className={rowClassName}>
        <td style={{ textAlign: "center" }}>{reassignation.id}</td>
        <td style={{ textAlign: "center" }}>{reassignation.report_id}</td>
        <td style={{ textAlign: "center" }}>{reassignation.dev_name}</td>
        <td style={{ textAlign: "center" }}>{tiempoDesde.fromNow()}</td>
      </tr>
    </>
  );
};

export default ReassignationRow;

