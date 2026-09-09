import React from 'react';
import Box from '@mui/material/Box';
import Navbar from './Navbar';
import Hero from './Hero/Hero';
import HowItWorks from './HowItWorks/HowItWorks';
import AboutUs from './About/AboutUs';
import Aplications from './Aplications/Aplications';
import Footer from './Footer/Footer';

const Landing = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#FFFFFF' }}>
      <Navbar />
      <Hero />
      <HowItWorks />
      <AboutUs />
      <Aplications />
      <Footer />
    </Box>
  );
};

export default Landing;
