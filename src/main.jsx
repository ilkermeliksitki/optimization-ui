import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Tailwind CSS import
import './App.css'   // exixsting styles
import App from './App.jsx'
import { ToastProvider } from '@/contexts/ToastContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
        <App />
    </ToastProvider>
  </StrictMode>,
)
