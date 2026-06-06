// src/App.js
import React, { useEffect, useState } from "react";
import TaskList from "./assets/components/TaskList";
import TaskForm from "./assets/components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error loading tasks:", err));
  }, []);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <>
    <div className="container-lg py-4">
      <div className="row align-items-center mb-4">
        <div className="col-12 col-md-6">
          <h1 className="fw-bold">Task List</h1>
        </div>
        <div className="col-12 col-md-6 text-md-end">
          {/* Modal trigger */}
          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTaskModal">
            <i className="bi bi-plus-lg"></i> Add Task
          </button>
        </div>
      </div>

      <TaskList tasks={tasks} onDelete={deleteTask} />

      {/* Modal */}
      <div className="modal fade" id="addTaskModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Task</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <TaskForm onAdd={addTask} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default App;
