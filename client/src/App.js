// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import NavBar from './components/NavBar';
import EditProfilePage from './pages/EditProfilePage';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        {/* Add additional routes here */}
      </Routes>
    </Router>
  );
}

export default App;
