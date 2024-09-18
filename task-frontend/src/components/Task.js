// src/components/Task.js
import React from "react";

const Task = ({ task, currentUser }) => {
  const isAssignedUser =
    task.assignedTo && task.assignedTo._id === currentUser.id;

  return (
    <div>
      <h3>{task.name}</h3>
      <p>
        Assigned to: {task.assignedTo ? task.assignedTo.name : "Unassigned"}
      </p>
      <p>Status: {task.status}</p>
      {isAssignedUser && (
        <button>Edit Task</button> // Only show the edit button to the assigned user
      )}
    </div>
  );
};

export default Task;
