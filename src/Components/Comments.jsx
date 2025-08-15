import { useEffect, useState } from "react";
import { getCommentsByArticleId, postCommentByArticleId, deleteCommentById } from "../api";
import {useContext} from "react"
import { UserContext } from "../Contexts/UserContext";

export default function Comments({ article_id }) {
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const [newUsername, setNewUsername] = useState("");
  const [newComment, setNewComment] = useState("");
  const [postStatus, setPostStatus] = useState("idle");
  const [postError, setPostError] = useState("");

  const [deleteComment, setDeleteComment] = useState(new Set())

  const {user} = useContext(UserContext)

  useEffect(() => {
    setStatus("loading");
    getCommentsByArticleId(article_id)
      .then(c => {
        setComments(c || [])
        setStatus("ready")
      })
      .catch(err => {
        setError(err.message || "Failed to load comments")
        setStatus("error")
      });
  }, [article_id])


  const handleSubmit = (e) => {
    e.preventDefault()

    if (!newUsername.trim() || !newComment.trim()) {
      setPostError("Please enter both a username and a comment.")
      return;
    }

    setPostStatus("posting")
    setPostError("")

    postCommentByArticleId(article_id, {
      username: newUsername.trim(),
      body: newComment.trim()
    })
      .then((createdComment) => {
        setComments(curr => [createdComment, ...curr])
        setNewComment("")
        setNewUsername("")
        setPostStatus("success")
      })
      .catch(err => {
        setPostError(err.message || "Failed to post comment")
        setPostStatus("error");
      })
  }

  async function handleDelete(comment_id){
    
    console.log("delete clicked", comment_id)
    setError("")
    const previous = comments
    setComments(previous.filter((comment) => comment.comment_id !== comment_id))
    setDeleteComment((set) => new Set(set).add(comment_id))

    try{
        await deleteCommentById(comment_id)
    }
    catch(error){
        setComments(previous)
        setError(error.message || "Failed to delete comment")
        setStatus("error")
    }
    finally{
        setDeleteComment((set) => {
            const copy = new Set(set)
            copy.delete(comment_id)
            return copy
        })
    }
  }

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
            <p><textarea
              placeholder="Your comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-textarea"
            />
            </p>
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
                <button disabled={comment.author !== user.username} onClick={()=> handleDelete(comment.comment_id)} >Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}