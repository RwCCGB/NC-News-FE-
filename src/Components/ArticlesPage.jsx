import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import SortValues from "./ArticleSort";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const params = useParams();
  const routeTopic = params.routeTopic;
  const [searchParams, setSearchParams] = useSearchParams();
  const sort_byParam = searchParams.get("sort_by") || "created_at";
  const orderParam = (searchParams.get("order") || "desc").toLowerCase();
  const topicParam = searchParams.get("topic") || undefined;

  const [query, setQuery] = useState(() => ({
    sort_by: sort_byParam,
    order: orderParam,
    ...(routeTopic ? { topic: routeTopic } : (topicParam ? { topic: topicParam } : {})),
  }));

  useEffect(() => {
    setQuery(q => ({ ...q, topic: routeTopic || undefined }));
  }, [routeTopic]);

  useEffect(() => {
    const next = new URLSearchParams();
    if (query.sort_by) next.set("sort_by", query.sort_by);
    if (query.order) next.set("order", query.order);
    if (query.topic) next.set("topic", query.topic);
    setSearchParams(next, { replace: true });
  }, [query, setSearchParams]);

  useEffect(() => {
    setStatus("loading");
    setError("");
    getArticles(query)
        .then(setArticles)
        .then(()=> setStatus("ready"))
        .catch(error => {
            setError(error.message || "Failed to load")
            setStatus("error")
        })
    }, [query])
      
    
    /*.then(list => {
        setArticles(list || []);
        setStatus("ready");
      })
      .catch(err => {
        setError(err.message || "Failed to load");
        setStatus("error");
      });
  }, [query.sort_by, query.order, query.topic]);*/

  const handleSortChange = useCallback((partial) => {
    setQuery(q => ({ ...q, ...partial }));
  }, []);

  return (
    <section className="articles-page container">
      <h1>Articles</h1>

      <SortValues
        sort_by={query.sort_by}
        order={query.order}
        onChange={handleSortChange}
      />

      {status === "loading" && <p className="muted">Loading...</p>}
      {status === "error" && <p className="error">Error: {error}</p>}
      {query.topic && <p className="muted">Filtering by topic: {query.topic}</p>}

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