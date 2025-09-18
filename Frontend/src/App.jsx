import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// global scss
import './App.scss'
// page imports
import ForsidePage from './pages/forsidePage/forsidePage.jsx';
import FindLiftPage from './pages/findLiftPage/findLiftPage.jsx';
import LiftDetailsPage from './pages/LiftDetailsPage/LiftDetailsPage.jsx';
import BookPage from './pages/BookPage/BookPage.jsx';
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
        <Route
          path="/Book/:id"
          element={
            <ProtectedRoute>
              <BookPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);