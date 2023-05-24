import React, { Component } from 'react';
import './CreateComment.css'

class CreateComment extends Component {
  render() {
    const { newComment, onCommentChange, onCommentSubmit } = this.props;

    return (
      <div className="mt-4">
        <h5>Create Comment</h5>
        <form onSubmit={onCommentSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              value={newComment}
              onChange={onCommentChange}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary custom-button">Submit</button>
        </form>
      </div>
    );
  }
}

export default CreateComment;
