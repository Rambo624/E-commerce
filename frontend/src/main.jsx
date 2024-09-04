import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {Provider} from "react-redux"
import appstore from './utils/appstore.js'
import './index.css'

createRoot(document.getElementById('root')).render(

    <StrictMode>
    <App />
  </StrictMode>,

  
)
