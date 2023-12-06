import React from 'react'
import ReactDOM from 'react-dom/client'
import Rotas from './routes/index.jsx'
import UserProvider from './contexts/user.jsx'
import ConsultaInfoProvider from './contexts/consultaInfo.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConsultaInfoProvider>
    <UserProvider>
      <div>
      <Rotas/>
      </div>
    </UserProvider>
    </ConsultaInfoProvider>
  </React.StrictMode>
)
