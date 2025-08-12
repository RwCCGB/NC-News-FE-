import { formatDate } from "../Utils/formatDate"

export default function ArticleCard({ article }) {
  const {
    title,
    author,
    topic,
    created_at,
    votes,
    comment_count,
    article_img_url,
  } = article

  return (
    <article className="card" aria-labelledby={`title-${article.article_id}`}>
      <img
        className="card_img"
        src={article_img_url}
        alt={title}
        loading="lazy"
      />
      <div className="card_body">
        <h3 id={`title-${article.article_id}`} className="card_title">
          {title}
        </h3>
        <div className="card_meta">
          <span aria-label="topic"><a>#{topic}</a></span>
          <span aria-label="author"> by {author}</span>
        </div>
        <div className="badges" aria-label="article stats">
          <p><span className="badge" title="votes">Total Votes: {votes}</span></p>
          <p><span className="badge" title="comments"> Total Comments: {comment_count}</span></p>
          <p><span className="badge" title="published">Date Published: {formatDate(created_at)}</span></p>
        </div>
      </div>
    </article>
  );
}