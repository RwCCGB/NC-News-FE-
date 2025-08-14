import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById } from "../api";
import { formatDate } from "../Utils/formatDate";
import Comments from "./Comments";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    setStatus("loading");
    getArticleById(article_id)
      .then((a) => { setArticle(a); setStatus("ready"); })
      .catch((err) => { setError(err.message || "Unable to load article"); setStatus("error"); });
  }, [article_id]);

  if (status === "loading") {
    return <div className="container article-page"><p className="muted">Loading…</p></div>;
  }
  if (status === "error") {
    return <div className="container article-page"><p className="error">Error: {error}</p></div>;
  }
  if (!article){
    return null;
  }

  const { title, topic, author, created_at, votes, body, article_img_url, comment_count } = article;

  return (
    <section className="container article-page">
      <div className="article-grid">
        <article className="card">
          <div className="article-header">
            <h1 className="article-title">{title}</h1>
            <div className="article-meta">
              <span className="pill">Votes: {votes ?? 0}</span>
              <span className="meta-secondary">#{topic}</span>
              <span className="meta-secondary">by {author}</span>
              <span className="meta-secondary">{formatDate(created_at)}</span>
            </div>
          </div>

          {article_img_url && (
            <div className="article-media">
              <img className="article-img" src={article_img_url} alt={`Image for ${title}`} />
            </div>
          )}

          <div className="article-body">
            <p>{body}</p>
          </div>

          <div className="article-actions">
            <button type="button" className="pill linklike" onClick={() => setShowComments(s => !s)}>
              {showComments ? "Hide" : "Show"} comments ({comment_count ?? 0})
            </button>
            <Link to="/articles" className="meta-secondary">← Back to list</Link>
          </div>
        </article>

        <aside className="card comments-section" aria-live="polite">
          <h2>Comments</h2>
          {showComments ? <Comments article_id={article_id} /> : <p className="muted">Comments are hidden.</p>}
        </aside>
      </div>
    </section>
  );
}