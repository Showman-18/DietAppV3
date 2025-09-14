import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Removed default index.css to use our theme
import App from './App.jsx'
import './global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
