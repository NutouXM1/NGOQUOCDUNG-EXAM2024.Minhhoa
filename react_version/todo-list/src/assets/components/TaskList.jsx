// src/components/TaskList.js
import React from "react";
import TaskCard from "./TaskCard";

function TaskList({ tasks, onDelete }) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default TaskList;
