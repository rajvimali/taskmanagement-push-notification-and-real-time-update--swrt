// src/components/CreateTask.js
import React, { useState } from "react";
import axios from "axios";

const CreateTask = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleCreateTask = async () => {
    const newTask = {
      name,
      description,
      assignedTo: assignedUser,
      dueDate, // Include due date
    };

    await axios.post("/api/tasks", newTask);
    // Handle task creation response
  };

  return (
    <div>
      <h3>Create a New Task</h3>
      <input
        type="text"
        placeholder="Task Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        value={assignedUser}
        onChange={(e) => setAssignedUser(e.target.value)}
      >
        {/* Fetch and populate available users here */}
        <option value="">Assign User</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={handleCreateTask}>Create Task</button>
    </div>
  );
};

export default CreateTask;
