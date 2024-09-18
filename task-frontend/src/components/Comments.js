// src/components/Comments.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Comments = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch comments for the task
    const fetchComments = async () => {
      const res = await axios.get(`/api/tasks/${taskId}`);
      setComments(res.data.comments);
    };
    fetchComments();
  }, [taskId]);

  const handleAddComment = async () => {
    // Add new comment
    const res = await axios.post(`/api/tasks/${taskId}/comments`, {
      text: newComment,
      userId: "current_user_id", // Replace with the actual logged-in user ID
    });
    setNewComment("");
  };

  return (
    <div>
      <h4>Comments</h4>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            {comment.text} (by {comment.createdBy})
          </li>
        ))}
      </ul>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default Comments;
