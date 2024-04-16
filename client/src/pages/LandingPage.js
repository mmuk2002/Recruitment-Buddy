import React, { useRef } from 'react';
import { Box, Card, CardContent, Typography, Avatar, useTheme, IconButton } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Testimonials from './Testimonials';
import AboutSection from './AboutPage';
import gradientTextStyle from '../components/fontStyle';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

// HeroSection modified to be full screen
const HeroSection = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      mt: { xs: 0, lg: 0 },
      position: 'relative', // For positioning ScrollArrow
    }}>
      <Typography variant="h2" sx={gradientTextStyle}>
        A Better Recruitment Tool <span>for Students</span>
      </Typography>
      <Typography variant="h3" align="center" sx={{ 
        mt: 2, // Adjust spacing as needed
        color: '#F1F1F1', 
        maxWidth: '4xl' 
      }}>
        Take Proactive Steps to Achieve Your Professional Goals 
      </Typography>
    </Box>
  );
};

const theme = createTheme({
  palette: {
    background: {
      default: 'black'
    },
    // If you are using text or elements over this background,
    // ensure their colors are set to maintain readability
    text: {
      primary: "#ffffff", // Example: white text for better contrast
      secondary: "#000000",
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

// Main landing page layout
const LandingPage = () => {
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  // Function to handle scrolling to a ref
  const scrollToRef = (ref) => ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeroSection scrollToNext={() => scrollToRef(aboutRef)} />
      <Box ref={aboutRef} sx={{ height: '100vh', position: 'relative' }}>
        <AboutSection scrollToNext={() => scrollToRef(contactRef)} />
      </Box>
      <Box ref={contactRef} sx={{ height: '100vh', position: 'relative' }}>
        <Testimonials />
      </Box>
      </ThemeProvider>
    </div>
  );
};

export default LandingPage;
