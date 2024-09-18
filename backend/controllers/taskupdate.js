// Update task and emit real-time event
const updateTask = async (taskId, newStatus) => {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus }),
  });

  const updatedTask = await response.json();

  // Emit task update to the Socket.io server
  socket.emit("taskUpdated", updatedTask);
};
