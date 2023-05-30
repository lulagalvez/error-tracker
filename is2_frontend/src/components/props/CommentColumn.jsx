import React, { Component, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { FaUser } from "react-icons/fa";
import moment from "moment";
import CreateComment from "./CreateComment";
import "./CommentColumn.css";
import APIService from '../services/APIService';


const CommentColumn = ({ bugReport }) => {
  const [comments, setComments] = useState([]);
  const[showErrorAlert,setShowErrorAlert]=useState(false);
  const[showSuccessAlert,setShowSuccessAlert]=useState(false);

  const api_service = new APIService();

  const addComment = (text) => {
    api_service.post('comments',{content: text, commenter_id:1, report_id: 1})
        .then(response =>{
            if(response?.message === 'Comentario creado'){
                setShowSuccessAlert(true);
            }else{
                setShowErrorAlert(true);
            }
        })
        .catch(error => console.log('error',error))
  }

  useEffect(() => {
    async function fetchData() {
      const response = await api_service.get('comments');
      setComments(response);
    }
    fetchData();
  }, []); 
  

  return (
    <div className="col-lg-6">
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Bug Report Details</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Title: {bugReport.title}
          </h6>
          <p className="card-text">Description: {bugReport.description}</p>
        </div>
      </div>

      <div className="card border-0 shadow-sm comment-container">
        <div className="card-body comment-list">
          <h5 className="card-title">Comments</h5>
          {comments.map((comment) => (
            <div key={comment.id} className="d-flex align-items-start mb-3">
              <FaUser className="me-3 mt-1" size={24} />
              <div>
                <div className="d-flex align-items-center">
                  <p className="m-0 me-2 comment-publisher">
                    {comment.commenter_id}
                  </p>
                  <small className="text-muted">
                    {moment(comment.date).fromNow()}
                  </small>
                </div>
                <p className="m-0 comment-text">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

       {/* CREATE COMMENT */} 
       <CreateComment submitLabel="Write" handleSubmit={addComment}/>  
    </div>
  );

}

export default CommentColumn;
