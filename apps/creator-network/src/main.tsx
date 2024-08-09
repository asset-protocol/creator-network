import "./wdyr.js"; // <--- first import
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'virtual:uno.css'
import AllContextProvider from './context/index.tsx'
import { BrowserRouter } from "react-router-dom"
import RouterObj from './router'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AllContextProvider>
        <RouterObj />
      </AllContextProvider>
    </BrowserRouter>
    </React.StrictMode>
  ,
)
