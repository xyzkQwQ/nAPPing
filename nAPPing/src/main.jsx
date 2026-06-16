import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import Page2 from './Page2.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page2 />
  </StrictMode>
)
