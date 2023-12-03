import React from 'react'
import ReactDOM from 'react-dom/client'
import Rotas from './routes/index.jsx'
import UserProvider from './contexts/user.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <div>
      <Rotas/>
      </div>
    </UserProvider>
  </React.StrictMode>
)
