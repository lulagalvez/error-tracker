import React, { useState } from "react";
import "./FloatingReasign.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import APIService from "../../services/APIService";

const FloatingReasign = ({ title, onSubmit, onClose }) => {
  const [issueText, setIssueText] = useState("");
  const apiservice = new APIService();
  const handleSubmit = () => {
    onSubmit(issueText);
    setIssueText("");
  };

  return (
    <div className="floating-card">
      <div className="header">
        <h3 >Razon de reasignacion</h3>
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <h4 >{title}</h4>
      <textarea
        className="text-box"
        value={issueText}
        onChange={(e) => setIssueText(e.target.value)}
        placeholder="Enter your issue..."
      ></textarea>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default FloatingReasign;
