import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTopics } from '../api'

export default function TopicsPage() {
  const [topics, setTopics] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    setStatus('loading')
    getTopics()
      .then(setTopics)
      .then(() => setStatus('ready'))
      .catch((err) => {
        setError(err.message || 'Failed to load topics')
        setStatus('error')
      });
  }, []);

  return (
    <main className="container">
      <h1>Topics</h1>

      {status === 'loading' && <p>Loading topics…</p>}
      {status === 'error' && <p className="error">{error}</p>}
      {status === 'ready' && topics.length === 0 && <p>No topics found.</p>}

      {status === 'ready' && topics.length > 0 && (
        <ul className="topics-grid" role="list">
          {topics.map((t) => (
            <li key={t.slug} className="card topic-card">
              <h2 className="topic-title">
                <Link to={`/topics/${t.slug}`}>#{t.slug}</Link>
              </h2>
              <p className="muted">{t.description}</p>
              <p>
                <Link className="pill" to={`/topics/${t.slug}`}>
                  View articles
                </Link>
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}