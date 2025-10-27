import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AllButtons from "./buttons/AllButtons.jsx"
import { BrowserRouter } from 'react-router-dom'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
