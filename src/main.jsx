import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from "react-router-dom";
import App from './App.jsx'
import Dawntrail from './Dawntrail.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <HashRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/api/hunts/dawntrail" element={<Dawntrail />}></Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
