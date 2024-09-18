// Add comment and emit real-time event
const addComment = async (taskId, commentText) => {
  const response = await fetch(`/api/tasks/${taskId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: commentText }),
  });

  const newComment = await response.json();

  // Emit new comment to the Socket.io server
  socket.emit("newComment", newComment);
};
// ======================================
// const addComment = async (req, res) => {
//     const { taskId, text } = req.body;

//     const task = await Task.findById(taskId);
//     const newComment = { text, date: new Date() };
//     task.comments.push(newComment);
//     await task.save();

// Emit real-time new comment
//     io.emit('newComment', newComment);

//     res.status(201).json(newComment);
//   };
