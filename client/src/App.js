import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Profile from './pages/ProfilePage2';
import DashboardPage from './pages/DashboardPage';
import NavBar from './components/NavBar';
import MatchesPage from './pages/MatchesPage';
import CreateAccountPage from './pages/CreateAccountPage';
import SignIn from './pages/SignIn';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import LandingPage from './pages/LandingPage';

const theme = createTheme({
  palette: {
    background: {
      default: 'black'
    },
    text: {
      primary: "#ffffff", 
    }
  },
  components: {
    // Apply the background gradient globally
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'linear-gradient(45deg, #007BFF 30%, #004DFF 90%)',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }
      }
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
            <Route path="/" element={<LandingPage />} />
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

