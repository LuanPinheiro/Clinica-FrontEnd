import React from 'react'
import ReactDOM from 'react-dom/client'
import Rotas from './routes/index.jsx'
import { Link } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Rotas/>
  </React.StrictMode>,
)
