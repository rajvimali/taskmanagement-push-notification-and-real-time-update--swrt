// src/components/AssignTask.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to Socket.io server

const AssignTask = ({ taskId }) => {
  const [users, setUsers] = useState([]);
  const [assignedUser, setAssignedUser] = useState("");

  useEffect(() => {
    // Fetch available users to assign
    const fetchUsers = async () => {
      const res = await axios.get("/api/users"); // Endpoint to get users
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const handleAssign = async () => {
    await axios.post("/api/tasks/assign", {
      taskId,
      assignedUserId: assignedUser,
    });

    // Optionally emit real-time task assignment event
    socket.emit("taskAssigned", { taskId, assignedTo: assignedUser });
  };

  return (
    <div>
      <h3>Assign Task</h3>
      <select
        value={assignedUser}
        onChange={(e) => setAssignedUser(e.target.value)}
      >
        <option value="" disabled>
          Select a user
        </option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
      <button onClick={handleAssign}>Assign Task</button>
    </div>
  );
};

export default AssignTask;
