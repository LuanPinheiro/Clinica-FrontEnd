import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/home/index.jsx'
import Medicos from './components/medicos/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home nome="Minha Clínica"/>
    <Medicos/>
  </React.StrictMode>,
)
