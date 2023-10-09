import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// import i18n (needs to be bundled ;)) 
import './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Suspense fallback="loading">
    <App />
  </React.Suspense>
)