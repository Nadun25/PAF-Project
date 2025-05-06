import { useState, useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./comments.scss";
import axios from "axios";

const Comments = ({ postId, commenterName, setcomments, numberOfComments }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const [menuOpen, setMenuOpen] = useState({}); // Track menu open state per comment
  const [editingComment, setEditingComment] = useState(null); // Track which comment is being edited
  const [updatedCommentText, setUpdatedCommentText] = useState(""); // Store the updated comment text

  // Fetch profile photo on mount
  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/profile-photo/${commenterName}`);
        setProfilePic(response.data);
      } catch (error) {
        console.error("Error fetching profile photo:", error);
      }
    };

    fetchProfilePhoto();
  }, [commenterName]);

  // Fetch comments whenever newComment changes (for refresh after adding new comments)
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/comments/allComments/${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchComments();
  }, [newComment, postId]); // Depend on postId to fetch comments again if the post changes

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return; // Don't submit empty comments
    
    try {
      const formData = new FormData();
      formData.append("pictureId", postId);
      formData.append("commenterName", commenterName);
      formData.append("comment", newComment);
      const response = await axios.post("http://localhost:8080/comments/saveComment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setNewComment("");
      setcomments(numberOfComments+1);
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error("Error commenting:", error);
    }
  };

  // Handle comment deletion
  const handleDeleteComment = async (id) => {
    try {
        // Send a DELETE request to the server to delete the comment with the specified ID
        await axios.delete(`http://localhost:8080/comments/delete/${id}`);
        setNewComment(""); 
        setcomments(numberOfComments-1);
        alert("Comment deleted successfully.");
    } catch (error) {
        console.error('Error deleting comment:', error);
        alert('Failed to delete comment.');
    }
  };

  // Start editing a comment
  const handleStartEdit = (comment) => {
    setEditingComment(comment.id);
    setUpdatedCommentText(comment.comment);
    setMenuOpen({}); // Close the dropdown menu
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingComment(null);
    setUpdatedCommentText("");
  };

  // Handle comment update
  const handleUpdateComment = async (id) => {
    if (!updatedCommentText.trim()) return; // Don't update with empty text
    
    try {
      // Using PATCH request with path variables similar to PostController
      await axios.patch(`http://localhost:8080/comments/update/${id}/${encodeURIComponent(updatedCommentText)}`);
      
      // Reset editing state and refresh comments
      setEditingComment(null);
      setUpdatedCommentText("");
      setNewComment(" "); // Trigger comment refetch
      setTimeout(() => setNewComment(""), 100);
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Failed to update comment.');
    }
  };

  // Handle menu toggle for comments
  const toggleMenu = (commentId) => {
    setMenuOpen((prev) => ({
        ...prev,
        [commentId]: !prev[commentId],
    }));
  };

  // Close all open menus when clicking outside
  const handleClickOutside = (event) => {
    if (!event.target.closest('.menu')) {
        setMenuOpen({});
    }
  };

  // Add a click event listener to handle clicks outside
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Format timestamp to show when comment was posted
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "just now";
    
    const commentDate = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - commentDate) / 1000);
    
    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    
    return commentDate.toLocaleDateString();
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={`data:image/jpeg;base64,${profilePic}`} alt="Profile" />
        <input
          type="text"
          placeholder="Write a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
        />
        <button onClick={handleCommentSubmit}>Send</button>
      </div>
      
      {/* Displaying comments */}
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <div className="user">
            <div className="userInfo">
              <img src={`data:image/jpeg;base64,${comment.profilePicture}`} alt="Profile" />
              <div className="details">
                <span>{comment.commenterName}</span>
                <p className="date">
                  {formatTimestamp(comment.createdAt)}
                  {comment.isEdited && <span className="edited-indicator"> (edited)</span>}
                </p>
              </div>
            </div>
            {/* Render the context menu button for comments by the current user */}
            {comment.commenterName === commenterName && (
              <div className="menu">
                <MoreHorizIcon onClick={() => toggleMenu(comment.id)} />
                {/* Render the context menu */}
                {menuOpen[comment.id] && (
                  <div className="dropdown-menu">
                    <button onClick={() => handleStartEdit(comment)}>Edit</button>
                    <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="content">
            {editingComment === comment.id ? (
              <div className="edit-mode">
                <input
                  type="text"
                  value={updatedCommentText}
                  onChange={(e) => setUpdatedCommentText(e.target.value)}
                  className="edit-input"
                  onKeyPress={(e) => e.key === 'Enter' && handleUpdateComment(comment.id)}
                />
                <div className="edit-buttons">
                  <button onClick={() => handleUpdateComment(comment.id)}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <span>{comment.comment}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;