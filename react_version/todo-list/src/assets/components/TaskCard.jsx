// src/components/TaskCard.js
import React from "react";

function TaskCard({ task, onDelete }) {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="row align-items-center gy-3">
          <div className="col-12 col-md-4">
            <small className="text-muted d-block">Task</small>
            <span>{task.taskName}</span>
          </div>
          <div className="col-6 col-md-2">
            <small className="text-muted d-block">Priority</small>
            <span className={`fw-bold text-${task.priority === "High" ? "danger" : task.priority === "Medium" ? "warning" : "success"}`}>
              {task.priority}
            </span>
          </div>
          <div className="col-6 col-md-2">
            <span className={`badge ${task.status === "Done" ? "bg-success" : task.status === "In Progress" ? "bg-warning text-dark" : "bg-secondary"}`}>
              {task.status}
            </span>
          </div>
          <div className="col-4 col-md-1 text-md-center">
            <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(task.id)}>
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
