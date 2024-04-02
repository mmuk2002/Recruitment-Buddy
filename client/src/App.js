// src/App.js

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import ProfilePage from './pages/ProfilePage';
// import DashboardPage from './pages/DashboardPage';
// import NavBar from './components/NavBar';
// import MatchesPage from './pages/MatchesPage'; // Import the new page
// import CreateAccountPage from './pages/CreateAccountPage';
// import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
// const theme = createTheme({
//   palette: {
//     background: {
//       default: '#add8e6' // light blue
//     }
//   }
// });
// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <NavBar />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/dashboard" element={<DashboardPage />} />
//           <Route path="/matches" element={<MatchesPage />} /> // Add a new route
//           <Route path="/create-account" element={<CreateAccountPage />} />
//           {/* Add additional routes here */}
//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;


// src/App.js

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import ProfilePage from './pages/ProfilePage';
// import DashboardPage from './pages/DashboardPage';
// import NavBar from './components/NavBar';
// import MatchesPage from './pages/MatchesPage';
// import CreateAccountPage from './pages/CreateAccountPage';
// import SignIn from './pages/SignIn'; // Import the SignIn component
// import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

// const theme = createTheme({
//   palette: {
//     background: {
//       default: '#add8e6' // light blue
//     }
//   }
// });

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <NavBar />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/dashboard" element={<DashboardPage />} />
//           <Route path="/matches" element={<MatchesPage />} />
//           <Route path="/create-account" element={<CreateAccountPage />} />
//           <Route path="/sign-in" element={<SignIn />} /> {/* New route for sign-in */}
//           {/* Add additional routes as needed */}
//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;







import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import HomePage from './pages/HomePage';
// import ProfilePage from './pages/ProfilePage';
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

