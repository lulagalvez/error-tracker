import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FaUser } from 'react-icons/fa';
import moment from 'moment';

/*INIT PIDE EL REPORTE SELECCIONADO EN LA LISTA*/
const CommentColumn = ({ bugReport }) => {
  return (
    <div className="col-lg-6">
      {/*DETALLES DEL BUG REPORT*/}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Bug Report Details</h5>
          {/*TITULO Y DESCRIPCION*/}
          <h6 className="card-subtitle mb-2 text-muted">Title: {bugReport.title}</h6>
          <p className="card-text">Description: {bugReport.description}</p>
        </div>
      </div>

      {/*CARTA PARA LOS COMENTARIOS*/}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Comments</h5>
          {/*MAPEO DE LOS COMENTARIOS */}
          {bugReport.comments.map((comment) => (
            <div key={comment.id} className="d-flex align-items-start mb-3">
              {/*ICONO DE USUARIO*/}
              <FaUser className="me-3 mt-1" size={24} />
              <div>
                {/*PUBLISHER, TIMESTAMP Y COMENTARIO*/}
                <div className="d-flex align-items-center">
                  <p className="m-0 me-2 comment-publisher">{comment.publisher}</p>
                  <small className="text-muted">{moment(comment.timestamp).fromNow()}</small>
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
