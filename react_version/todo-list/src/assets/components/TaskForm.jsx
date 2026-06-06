// src/components/TaskForm.js
import React, { useState } from "react";

function TaskForm({ onAdd }) {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("Low");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!taskName.trim()) {
      setError("Tên Task không được để trống");
      return;
    }
    if (taskName.length > 100) {
      setError("Tên Task không được vượt quá 100 ký tự");
      return;
    }

    onAdd({
      id: Date.now(),
      taskName,
      priority,
      status: "To Do"
    });

    setTaskName("");
    setPriority("Low");
    setError("");
  };

  return (
    <div>
      <div className="mb-3">
        <label className="form-label">Task</label>
        <input
          type="text"
          className="form-control"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Type your task here..."
        />
        {error && <div className="text-danger mt-2">{error}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label d-block">Priority</label>
        <div className="d-flex flex-wrap gap-2">
          {["High", "Medium", "Low"].map((level) => (
            <label
              key={level}
              className={`btn btn-outline-${level === "High" ? "danger" : level === "Medium" ? "warning" : "success"} ${priority === level ? "active" : ""}`}
            >
              <input
                type="radio"
                name="priority"
                value={level}
                checked={priority === level}
                onChange={() => setPriority(level)}
                className="btn-check"
              />
              {level}
            </label>
          ))}
        </div>
      </div>

      <button className="btn btn-secondary px-4" onClick={handleSubmit}>
        Save Task
      </button>
    </div>
  );
}

export default TaskForm;
