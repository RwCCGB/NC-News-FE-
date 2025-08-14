import { Link } from "react-router-dom";
import { formatDate } from "../Utils/formatDate";

export default function ArticleCard({ article }) {
  const { article_id, title, topic, author, created_at, votes, article_img_url, comment_count } = article;

  return (
    <>
      <div className="thumb">
        {article_img_url ? (
          <img className="article-img" src={article_img_url} alt={`Thumbnail for ${title}`} />
        ) : null}
      </div>

      <div className="content">
        <h3 className="title">
          <Link to={`/articles/${article_id}`}>{title}</Link>
        </h3>

        <div className="row">
          <span className="pill">Votes: {votes ?? 0}</span>
          <span className="meta-secondary">#{topic}</span>
          <span className="meta-secondary">by {author}</span>
          <span className="meta-secondary">{formatDate(created_at)}</span>
        </div>

        <div className="row">
          <Link className="pill linklike" to={`/articles/${article_id}`}>Comments: {comment_count ?? 0}</Link>
        </div>
      </div>
    </>
  );
}
