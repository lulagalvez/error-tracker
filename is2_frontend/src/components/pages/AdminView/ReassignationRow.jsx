import React from "react";

const ReassignationRow = ({ reassignation, handleClick, selectedReassignation }) => {
  const isReassignationSelected = selectedReassignation === reassignation;
  const rowClassName = isReassignationSelected ? "active" : "";

  const formatoFecha = (strFecha) => {
    const ret = new Date(strFecha);
    return ret.toLocaleDateString();
  };
  
  return (
    <>
      <tr  onClick={() => handleClick(reassignation)} className={rowClassName}>
        <td style={{ textAlign: "center" }}>{reassignation.id}</td>
        <td style={{ textAlign: "center" }}>{reassignation.report_id}</td>
        <td style={{ textAlign: "center" }}>{reassignation.dev_name}</td>
        <td style={{ textAlign: "center" }}>{formatoFecha(reassignation.date)}</td>
      </tr>
    </>
  );
};

export default ReassignationRow;
