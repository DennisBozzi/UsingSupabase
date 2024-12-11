import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { consoleError } from './lib/utils.ts'
import App from './App.tsx'
import './css/globals.css'

consoleError()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
