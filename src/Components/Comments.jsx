import { useEffect, useState } from "react";
import { getCommentsByArticleId, postCommentByArticleId } from "../api";

export default function Comments({ article_id }) {
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const [newUsername, setNewUsername] = useState("");
  const [newComment, setNewComment] = useState("");
  const [postStatus, setPostStatus] = useState("idle");
  const [postError, setPostError] = useState("");

  useEffect(() => {
    setStatus("loading");
    getCommentsByArticleId(article_id)
      .then(c => {
        setComments(c || []);
        setStatus("ready");
      })
      .catch(err => {
        setError(err.message || "Failed to load comments");
        setStatus("error");
      });
  }, [article_id]);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newUsername.trim() || !newComment.trim()) {
      setPostError("Please enter both a username and a comment.");
      return;
    }

    setPostStatus("posting");
    setPostError("");

    postCommentByArticleId(article_id, {
      username: newUsername.trim(),
      body: newComment.trim()
    })
      .then((createdComment) => {
        setComments(curr => [createdComment, ...curr]);
        setNewComment("");
        setNewUsername("");
        setPostStatus("success");
      })
      .catch(err => {
        setPostError(err.message || "Failed to post comment");
        setPostStatus("error");
      });
  };

  return (
    <div>
      {status === "loading" && <p>Loading comments...</p>}
      {status === "error" && <p className="error">{error}</p>}

      {status === "ready" && (
        <>
          <form onSubmit={handleSubmit} className="comment-form">
            <input
              type="text"
              placeholder="Please enter your username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="comment-input"
            />
            <textarea
              placeholder="Your comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-textarea"
            />
            <button type="submit" className="commentButton" disabled={postStatus === "posting"}>
              {postStatus === "posting" ? "Posting..." : "Post Comment"}
            </button>
            {postError && <p className="error">{postError}</p>}
          </form>

          <ul className="comments-list">
            {comments.map((comment) => (
              <li key={comment.comment_id} className="comment-card">
                <p className="comment-meta">
                  <strong>{comment.author}</strong> — {new Date(comment.created_at).toLocaleString()}
                </p>
                <p className="comment-body">{comment.body}</p>
                <a>Delete</a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}