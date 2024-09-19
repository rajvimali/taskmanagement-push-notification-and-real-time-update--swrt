// src/App.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";

import Comments from "./components/Comments";

const SOCKET_SERVER_URL = "http://localhost:5000"; // Backend server URL

function App() {
  const [tasks, setTasks] = useState([]);
  const [comments, setComments] = useState([]);

  // Establish connection to Socket.io server with JWT token
  useEffect(() => {
    const token = localStorage.getItem("token"); // Assume user token is stored after login
    const socket = io(SOCKET_SERVER_URL, {
      query: { token }, // Pass JWT token to the server
    });

    const fetchTasks = async () => {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    };

    fetchTasks();

    // Listen for real-time task updates
    socket.on("taskUpdated", (updatedTask) => {
      console.log("Task Updated:", updatedTask);
      setTasks((prevTasks) => {
        return prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
      });
    });

    // Listen for real-time new tasks
    socket.on("newTask", (newTask) => {
      console.log("New Task Created:", newTask);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });

    // Listen for real-time new comments
    socket.on("newComment", (newComment) => {
      console.log("New Comment Added:", newComment);
      setComments((prevComments) => [...prevComments, newComment]);
    });

    // Clean up the socket connection
    return () => {
      // socket.disconnect();
      socket.off("taskAssigned");
      socket.off("taskUpdated");
      socket.off("newTask");
      socket.off("newComment");
    };
  }, []);

  return (
    <div className="App">
      <h1>Task Management App with Real-Time Updates</h1>

      {/* Render tasks */}
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <>
            <li key={task.id}>
              {task.name} -Status:{"Status"}
            </li>
            <li key={task.id}>
              {task.name} - Assigned to:{" "}
              {task.assignedTo ? task.assignedTo.name : "Unassigned"}
            </li>
            <li key={task.id}>
              {task.name} - Due on:{" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </li>
            <li key={task._id} className="list-group-item">
              {task.name} - Due on:{" "}
              {new Date(task.dueDate).toLocaleDateString()}
              <Comments taskId={task._id} />
            </li>
          </>
        ))}
      </ul>

      {/* Render comments */}
      <h2>Comments</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
