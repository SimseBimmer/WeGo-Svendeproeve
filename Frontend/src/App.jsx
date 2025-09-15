import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// global scss
import './App.scss'
// page imports
import ForsidePage from './pages/ForsidePage/ForsidePage.jsx';
import MinSide from './pages/MinSidePage/MinSide.jsx';
// component imports 
import HeaderComponent from './components/Header/HeaderComponent.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<ForsidePage />} />
        <Route path="/minside" element={<MinSide />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);