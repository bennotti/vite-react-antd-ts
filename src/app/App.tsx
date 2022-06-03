import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import logo from './assets/logo.svg'
import './assets/css/App.css'
import Inicio from '../modulos/exemplos/telas/Inicio'
import Sobre from '../modulos/exemplos/telas/Sobre'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
      </header>
      <nav>
        <Link to="/" style={{ marginRight: 20 }}>Inicio</Link>
        <Link to="/sobre">Sobre</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="sobre" element={<Sobre />} />
      </Routes>
    </div>
  )
}

export default App
