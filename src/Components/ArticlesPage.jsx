import { useEffect, useState } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    setStatus("loading");
    getArticles()
      .then(setArticles)
      .then(() => setStatus("ready"))
      .catch((err) => {
        setError(err.message || "Failed to load");
        setStatus("error");
      });
  }, []);

  return (
    <section className="articles-page container">
      <h1>Articles</h1>

      {status === "loading" && <p className="muted">Loading…</p>}
      {status === "error" && <p className="error">Error: {error}</p>}

      {status === "ready" && (
        <ul className="articles-grid" role="list">
          {articles.map((article) => (
            <li key={article.article_id} className="card article-card">
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}