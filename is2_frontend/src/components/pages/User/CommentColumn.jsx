import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { FaUser } from "react-icons/fa";
import moment from "moment";
import CreateComment from "./CreateComment";
import "./CommentColumn.css";

class CommentColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: "",
      bugReport: props.bugReport,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.bugReport !== this.props.bugReport) {
      this.setState({ bugReport: this.props.bugReport });
    }
  }

  handleCommentChange = (event) => {
    this.setState({ newComment: event.target.value });
  };

  handleCommentSubmit = (event) => {
    event.preventDefault();
    const { newComment, bugReport } = this.state;

    //Manejo de comentarios vacios 
    if (newComment.trim() === "") {
      return;
    }

    const comment = {
      id: bugReport.comments.length + 1,
      publisher: "User",
      timestamp: moment().toISOString(),
      text: newComment,
    };

    bugReport.comments.push(comment);

    this.setState({ newComment: "", bugReport: bugReport });
  };

  render() {
    const { bugReport, newComment } = this.state;

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
            {bugReport.comments.map((comment) => (
              <div key={comment.id} className="d-flex align-items-start mb-3">
                <FaUser className="me-3 mt-1" size={24} />
                <div>
                  <div className="d-flex align-items-center">
                    <p className="m-0 me-2 comment-publisher">
                      {comment.publisher}
                    </p>
                    <small className="text-muted">
                      {moment(comment.timestamp).fromNow()}
                    </small>
                  </div>
                  <p className="m-0 comment-text">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CREATE COMMENT */}
        <CreateComment
          newComment={newComment}
          onCommentChange={this.handleCommentChange}
          onCommentSubmit={this.handleCommentSubmit}
        />
      </div>
    );
  }
}

export default CommentColumn;
