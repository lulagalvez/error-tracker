import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FaUser } from 'react-icons/fa';
import moment from 'moment';

const CommentColumn = ({ bugReport }) => {
  return (
    <div className="overflow-auto  col-lg-6">
      <div className="mb-4">
        <div className="body">
          <h5 className="title">Bug Report Details</h5>
          <h6 className="subtitle mb-2 text-muted">Title: {bugReport.title}</h6>
          <p className="text">Description: {bugReport.description}</p>
        </div>
      </div>

      <div className="">
        <div className="body">
          <h5 className="title">Comments</h5>
          {bugReport.comments.map((comment) => (
            <div key={comment.id} className="card-text d-flex align-items-start">
              
              <div className="comment-details">
              
                <div className="d-flex align-items-center justify-content-between mb-2">
                <FaUser className="mr-2 mt-1" size={24} />
                  <div className="d-flex p-2">
                    <p className="m-0 comment-publisher">{comment.publisher}</p>
                    <span className=" ml-2 text-muted">{moment(comment.timestamp).fromNow()}</span>
                  </div>
                  
                </div>
                <p className="m-0 comment-text">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentColumn;
