import React, { useRef } from 'react';
import { Box, Card, CardContent, Typography, Avatar, useTheme, IconButton } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Testimonials from './Testimonials';
import AboutSection from './AboutPage';
import gradientTextStyle from '../components/fontStyle';
// ScrollArrow component
const ScrollArrow = ({ onClick }) => (
  <IconButton onClick={onClick} sx={{ color: 'white', alignSelf: 'center', position: 'absolute', bottom: 16 }}>
    <ArrowDownwardIcon fontSize="large" />
  </IconButton>
);

// HeroSection modified to be full screen
const HeroSection = ({ scrollToNext }) => {
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
      <ScrollArrow onClick={scrollToNext} />
    </Box>
  );
};

// Main landing page layout
const LandingPage = () => {
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  // Function to handle scrolling to a ref
  const scrollToRef = (ref) => ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div>
      <HeroSection scrollToNext={() => scrollToRef(aboutRef)} />
      <Box ref={aboutRef} sx={{ height: '100vh', position: 'relative' }}>
        <AboutSection scrollToNext={() => scrollToRef(contactRef)} />
      </Box>
      <Box ref={contactRef} sx={{ height: '100vh', position: 'relative' }}>
        <Testimonials />
      </Box>
    </div>
  );
};

export default LandingPage;
