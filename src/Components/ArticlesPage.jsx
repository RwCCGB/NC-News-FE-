import { useEffect, useState } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard"

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false
    setStatus("loading")
    getArticles()
      .then((data) => {
        if (!cancelled) {
          setArticles(data)
          setStatus("success")
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e)
          setStatus("error")
        }
      })
    return () => { cancelled = true; }
  }, [])

  if (status === "loading"){
    return <div className="main"><p>Loading articles…</p></div>
  }
  if (status === "error"){
     return <div className="main"><p role="alert">Error: {error.message}</p></div>
  }

  return (
    <div className="main">
      <h1>All Articles</h1>
      <div className="grid" role="list">
        {articles.map((a) => (
          <div role="listitem" key={a.article_id}>
            <ArticleCard article={a} />
          </div>
        ))}
      </div>
    </div>
  );
}