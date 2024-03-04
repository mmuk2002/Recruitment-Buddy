// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import NavBar from './components/NavBar';
import MatchesPage from './pages/MatchesPage'; // Import the new page
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
const theme = createTheme({
  palette: {
    background: {
      default: '#add8e6' // light blue
    }
  }
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/matches" element={<MatchesPage />} /> // Add a new route
          {/* Add additional routes here */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
