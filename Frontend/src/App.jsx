import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// global scss
import './App.scss'
// page imports
import ForsidePage from './pages/forsidePage/forsidePage.jsx';
import FindLiftPage from './pages/FindLiftPage/FindLiftPage.jsx';
import LiftDetailsPage from './pages/LiftDetailsPage/LiftDetailsPage.jsx';
// component imports 
import HeaderComponent from './components/Header/HeaderComponent.jsx';

// Beskyttet route til min side
function ProtectedRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem('accessToken');
  return isLoggedIn ? children : <Navigate to="/" />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<ForsidePage />} />
        <Route path="/FindLift" element={<FindLiftPage />} />
        <Route path="/LiftDetails/:id" element={<LiftDetailsPage />} />
        {/* MinSidePage fjernet, nu bruges modal */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);