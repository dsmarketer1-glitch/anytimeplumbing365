import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register'
import { ClerkProvider } from '@clerk/react'

// Register service worker for PWA
registerSW({ immediate: true })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </StrictMode>,
)
