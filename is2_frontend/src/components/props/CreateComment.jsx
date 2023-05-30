import React, { Component, useState } from 'react';
import './CreateComment.css'

const CreateComment = ({handleSubmit, submitLabel}) => {
  const [text, setText] = useState("");
  const isTextAreaDisabled = text.length === 0
  const onSubmit = event => {
    event.preventDefault()
    handleSubmit(text)
    setText("")
  }
  return (
    <div className="mt-4">
      <h5>Create Comment</h5>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button className="btn btn-primary custom-button" disabled={isTextAreaDisabled}>Submit</button>
      </form>
    </div>
  )
};

export default CreateComment;