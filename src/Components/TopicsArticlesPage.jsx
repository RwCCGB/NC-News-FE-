import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getArticlesByTopic } from '../api'
import ArticleCard from './ArticleCard'

export default function TopicArticlesPage() {
  const { slug } = useParams()
  const [articles, setArticles] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    setStatus('loading');
    getArticlesByTopic(slug)
      .then(setArticles)
      .then(() => setStatus('ready'))
      .catch((err) => {
        setError(err.message || 'Failed to load articles')
        setStatus('error')
      });
  }, [slug])

  return (
    <main className="container">
      <header className="page-header">
        <h1>#{slug}</h1>
        <p className="muted">
          <Link to="/topics" className="linklike">← All topics</Link>
        </p>
      </header>

      {status === 'loading' && <p>Loading articles…</p>}
      {status === 'error' && <p className="error">{error}</p>}

      {status === 'ready' && articles.length === 0 && (
        <div className="card">
          <p>No articles in this topic yet.</p>
        </div>
      )}

      {status === 'ready' && articles.length > 0 && (
        <ul className="articles-list" role="list">
          {articles.map((a) => (
            <li key={a.article_id}><ArticleCard article={a} /></li>
          ))}
        </ul>
      )}
    </main>
  )
}