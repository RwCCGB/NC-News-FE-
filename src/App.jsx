import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {NavLink, Route, Routes, Navigate} from "react-router-dom"
import ArticlesPage from "./Components/ArticlesPage"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <nav aria-label='Primary'>
          <NavLink to="/articles" end>Articles</NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/articles" replace />}/>
        <Route path="/articles" element={<ArticlesPage/>}/>
        <Route path="*" element={<div><p>Page Not Found</p></div>}/>
      </Routes>
    </>
  )
}

export default App
