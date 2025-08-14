import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import ArticlesPage from "./Components/ArticlesPage";
import ArticlePage from "./Components/ArticlePage";
import Homepage from "./Components/Homepage";
import "./Design/styling.css"

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <header>
          <h1 aria-label="App Title">NC News</h1>
          <nav className="nav" aria-label="Primary">
            <NavLink className="nav-btn" to="/">Home</NavLink>
            <NavLink className="nav-btn" to="/articles">Articles</NavLink>
            <NavLink className="nav-btn" to="/topics">Topics</NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route
            path="*"
            element={
              <main>
                <h1>404</h1>
                <p>Not found. <Link to="/articles">Go to articles</Link></p>
              </main>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}