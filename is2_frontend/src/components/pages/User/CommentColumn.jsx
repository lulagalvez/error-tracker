import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const CommentColumn = ({ bugReport }) => {
  return (
    <div className="col-lg-6">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Bug Report Details</h5>
          <h6 className="card-subtitle mb-2 text-muted">Title: {bugReport.title}</h6>
          <p className="card-text">Description: {bugReport.description}</p>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Comments</h5>
          {bugReport.comments.map((comment) => (
            <p key={comment.id} className="card-text">{comment.text}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentColumn;
