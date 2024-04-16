import React from 'react';
import { testimonials } from "../constants";
import { Box, Typography, Paper, Grid, Avatar } from '@mui/material';
import gradientTextStyle from '../components/fontStyle';

const Testimonials = () => {
  return (
    <Box mt={10} sx={{ textAlign: 'center' }}>
      <Typography variant="h2" component="h2" my={{ xs: 6, lg: 12 }} style={gradientTextStyle} >
        What People are saying
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} lg={3.5} key={index}>
            <Paper elevation={6} sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 250, // Set a minimum height for all cards
              bgcolor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
              borderRadius: 'md',
              p: 3,
              borderColor: 'neutral.main',
              borderWidth: 1,
              borderStyle: 'solid',
              color: 'text.primary',
            }}>
              <Typography variant="body1" sx={{ flexGrow: 1, mb: 2 }}>{testimonial.text}</Typography>
              <Box display="flex" alignItems="center">
                <Avatar src={testimonial.image} alt={testimonial.user} sx={{ width: 48, height: 48, mr: 2, border: 1, borderColor: 'neutral.light' }} />
                <Box>
                  <Typography variant="subtitle1">{testimonial.user}</Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'white' }}>
                    {testimonial.company}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;
