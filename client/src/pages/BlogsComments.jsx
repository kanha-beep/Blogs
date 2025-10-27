import React, { useEffect, useState } from "react";
import api from "../utils/api.js"; // Axios instance
import { useParams } from "react-router-dom";

export const BlogsComments = () => {
  const { id } = useParams();
  // console.log("id in comments", id);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [commentUser, setCommentUser] = useState("");
  // 1️⃣ Fetch comments for this blog
  const fetchComments = async () => {
    try {
      const res = await api.get(`/blogs/${id}/comments`);

      setComments(res.data.comments);
      setCommentUser(res?.data?.comments.map((c) => c?.user?.name));

      setCommentContent(res?.data?.comments.map((c) => c?.content));
    } catch (e) {
      console.log("Error fetching comments:", e?.response?.data?.message);
    }
  };
  useEffect(() => {
    console.log("comments fetched:", comments);
    console.log("commentUser:", commentUser);
    console.log("commentContent", commentContent);
  }, [commentUser, commentContent]);
  useEffect(() => {
    fetchComments();
  }, [id]);

  // 2️⃣ Add new comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("comment started");
    try {
      const res = await api.post(`/blogs/${id}/comments`, {
        content: commentText,
      });
      console.log("comment added:", res.data.comment);
      setComments((prev) => [...prev, res.data.comment]);
      setCommentText("");
      fetchComments();
    } catch (e) {
      console.log("Error adding comment:", e?.response?.data?.message);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Comments</h4>
      <form onSubmit={handleSubmit} className="mb-3">
        <textarea
          name="content"
          className="form-control mb-2"
          placeholder="Write your comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows="3"
        />
        <button type="submit" className="btn btn-primary">
          Add Comment
        </button>
      </form>

      <div>
        {comments === "undefined" && "No Comments Yet..."}
        {commentUser && commentContent && (
          <>
            {commentUser.map((c, i) => (
              <div
                key={i}
                className="border p-2 mb-2 rounded d-flex justify-content-between"
              >
                <div>
                  Name: <b>{c || "Anonymous"}</b>
                </div>
                <div>Comment: {commentContent[i]}</div>
                <div
                  className="d-flex justify-content-evenly"
                  style={{ width: "12rem" }}
                >
                  <button className="btn btn-secondary">Edit</button>
                  <button className="btn btn-secondary">Delete</button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
