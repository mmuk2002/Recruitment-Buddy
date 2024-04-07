import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import HomePage from './pages/HomePage';
import Profile from './pages/ProfilePage2';
import DashboardPage from './pages/DashboardPage';
import NavBar from './components/NavBar';
import MatchesPage from './pages/MatchesPage';
import CreateAccountPage from './pages/CreateAccountPage';
import SignIn from './pages/SignIn';
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
      <AuthProvider> {/* Wrap your components with AuthProvider */}
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="/sign-in" element={<SignIn />} />
            {/* Add additional routes as needed */}
          </Routes>
        </Router>
      </AuthProvider>

    </ThemeProvider>
  );
}

export default App;

